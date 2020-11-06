---
layout: post
title: Jenkins for the smart and lazy
subtitle: Automating the automation ;)
bigimg: /img/posts/jason-leung-HBGYvOKXu8A-unsplash.jpg
tags: [jenkins, automation]
comments: true
---

I guess nobody likes creating Jenkins jobs. And probably their maintenance is even worse if done manually. There are a bunch of tools that come to the rescue
- I will describe them in a nutshell.

### Create your local Jenkins in less than a minute
To achieve this pretty tight deadline, let's just use the docker. I am showing commands for Linux here, I suppose in Windows things can be slightly more
complicated, but I can be mistaken of course.

To get the docker, let's install a docker compose:
```shell
apt install docker-compose
```

Now, let's pull the Jenkins and configure it (in this example to use the persistent storage and run on 8081)
```shell
# pull the Jenkins image
docker image pull jenkins/jenkins:lts

# create a persistent volume called jenkinsvol
docker volume create jenkinsvol

# run the Jenkins on 8081 and make it use the storage. Let's call the container jenkins-local
docker container run -d -p 8081:8080 -v jenkinsvol:/var/jenkins_home --name jenkins-local jenkins/jenkins:lts
```

The Jenkins should become accessible under http://localhost:8081

In order to get the admin password needed to set up the Jenkins, execute below:
```shell
docker container exec jenkins-local sh -c "cat /var/jenkins_home/secrets/initialAdminPassword"
```

Voila! Now you can start/stop jenkins by using docker:
```bash
sudo docker start jenkins-local
sudo docker stop jenkins-local

```
Thanks to that, it is possible to quickly check the below pipelines.

### Bit of history
There are a bunch of tools that can help us in the automation of mundane tasks in Jenkins.
Job DSL and Jenkins pipelines are my favorites and can be even more powerful when combined.

### Job DSL in a nutshell
Job DSL is an early approach to automate the creation of Jenkins jobs. Instead of doing all the configuration manually, the plugin allowed to code the configuration in Groovy.
The execution of such a script will result in creating a Jenkins job, exactly the same as done manually. The power of that solution comes also with the Groovy language.
It is possible to create multiple different types of jobs in one script - also in loops, with different variables, etc. In other words - one parametrized loop can create lots of different jobs
in a few seconds. Additionally, putting them in a VCS will preserve all configuration changes and give additional context to their reader about changes from the past.

A further description of the plugin is available here: [Job DSL Jenkins plugin](https://plugins.jenkins.io/job-dsl). Generally speaking, to execute a DSL script, we need:
1. Install the plugin in Jenkins.
2. Create a seed job that will generate other jenkins jobs from the script. We need to put the script in the Build/Process Job DSLs section.
3. Run the seed that will generate Jenkins jobs.

In a nutshell, if we want to create the simplest hello-world job, we can define it like that:

```groovy
job('hello-world') {
  steps {
    shell('echo Hello World!') // batchFile in Windows instead of shell
  }
}
```

It is possible to create pipelines and multi-branch pipelines as well as views.
The beauty of combining those things together is the result of overall automation we can achieve:
1. One seed job can generate multiple pipelines and views
2. Jenkins pipelines define further how to execute builds in detail. They contain steps with the flow of the build execution (like clean, build, deploy, etc). They are also Groovy scripts (Jenkinsfile) so they can be stored in a VCS
3. All created jobs are automatically placed in dedicated views based on regexp of their name
4. Once all scripts are created, the execution of them takes just a few seconds

I will describe what are Jenkinsfiles below further, but first - let's define an example seed job that will create a Jenkins multi-branch pipeline called `pipeline-example` with few very common settings:

```groovy
multibranchPipelineJob('pipeline-example') { // this will be a multi-branch pipeline
    factory {
        workflowBranchProjectFactory {
            scriptPath('Jenkinsfile') // the path to the Jenkinsfile that will be executed
        }
    }
    branchSources {
        branchSource {
            source {
                gitSCMSource {
                    remote('https://path-to-the-git-repo.git')
                }
            }
        }
    }
    triggers {
        periodic(30) //the repo is checked for the new code every 30 mins
    }
    orphanedItemStrategy {
        discardOldItems {
            numToKeep(5) // 5 jobs in history
        }
    }
}
```

The multi-branch pipeline is very suitable for a development purpose when devs are working on different branches. Every defined amount of time, all branches are scanned for the Jenkinsfile
and built if the Jenkinsfile exists. It comes handy also while working heavily on the Jenkinsfiles itself - each branch can have different Jenkinsfiles, therefore different steps may be
invoked for different branches.

To create a pipeline job, we need a couple of changes in the script:
```groovy
pipelineJob('pipeline-example') {
  definition {
    logRotator(-1, 5) // 5 jobs in history
    cpsScm {
      scm {
        git {
          branch 'master'
          scriptPath 'Jenkinsfile'
          remote {
                name 'origin'
                url 'https://path-to-the-git-repo.git'
            }   
        }
      }
    }
  }
}
```

It is possible to have several Jenkinsfiles in the project. They can have different names and be stored in different folders - we can reference them by their path in Job DSL scripts.

### Automating views creation
As I have mentioned earlier, it is possible also to create views. They are very convenient because created jobs are automatically placed in dedicated views based on regexp of their name.
No more updating views manually or searching for a particular job! The only thing we need to remember is to keep the already established naming convention (i.e. same prefix for the job name, i.e. `myproject-development`, `myproject-release` etc.).
There are lots of more complex views available in the documentation, but the simple list view is suitable for most use cases I think.
In order to create such a list for all jobs with "my-project" regexp and standard columns, we can just invoke the below job DSL script:
```groovy
listView('My project') {
    description('This is my awesome project')
    jobs {
        name('My project job')
        regex(/myproject.*/)
    }
    columns {
        status()
        weather()
        name()
        lastSuccess()
        lastFailure()
        lastDuration()
        buildButton()
    }
}
```
If we have multiple projects, it is a good idea just to run the above in a loop and parametrize descriptions, names and regexps. The script will quickly place all jobs in a dedicated view.
Fast, simple, beautiful!

A further documentation about views (and the pipeline plugin itself) is available here: [Job DSL plugin documentation](https://jenkinsci.github.io/job-dsl-plugin/#path/listView)

### Jenkins pipelines approach
The Job DSL plugin did (and still does!) a great... job, but a Jenkins' approach is even better! It does not only allow to store the job configuration as code,
but also comes with a pretty UI that can show the job execution.
In this section, I will talk about a declarative approach to Jenkins Pipelines.
The idea is pretty simple - we just need to create a script that contains several steps of the execution.
Steps can execute shell commands, other scripts, run other jobs, use parametrized values, and invoke other plugins (if those plugins support the Jenkins Pipelines because not all do).
Once we have the Jenkinsfile ready, we need to create a pipeline job (or multi-branch pipeline) and point the Jenkinsfile (i.e. by providing the path in the repository or just pasting the script).
Done!

Below there is an example of a simple pipeline that will just build a gradle project.

```groovy
pipeline {
    agent any
    stages {
        stage('Clean') {
            steps {
                sh 'chmod +x gradlew'
                sh './gradlew clean'
            }
        }
        stage('Build') {
            steps {
                sh './gradlew build -x test'
            }
        }
        stage('Test') {
            steps {
                sh './gradlew test'
            }
        }
        stage('Javadoc') {
            steps {
                sh './gradlew javadoc'
            }
        }
    // further steps...
    }
}
```

Sometimes there is a need to additionally check out the code from a different branch. This can be achieved simply by defining the branch and URL to the repo:

```groovy
stage('Checkout') {
    steps {
        git branch: 'master', url: 'http://gitRepoUrl.git'
    }
}
```

The script can be parametrized further, below some basic but pretty useful settings:
```groovy
pipleine {
    agent { label 'myserver' } // the agent the script is going to be executed on
    triggers { cron('@daily') } // the trigger to run the job, in this example a cron (specific or daily, hourly etc.)
    environment {
        myEnvVariable = '123' // env variables
    }
    options { disableConcurrentBuilds() } // additional options, here example to build sequentially
    paramemters {
        string defaultValue: '', description: 'My string param that will be trimmed', name: 'myStringValue', trim: true
        booleanParam defaultValue: true, description: 'To be or not to be?', name: 'myBooleanValue' // parameters, like strings, enums, and the most tricky - booleans!
    }
    // further settings...
    stage('Task performed only on master') {
        when {
            branch 'master'
        }
        steps {
            sh 'echo hello my master!'
            sh "This is my env variable: ${myEnvVariable}"
        }
    }
    stage('Something performed based on the boolean value') {
        when {
            expression { return myBooleanValue ==~ /(?i)(Y|YES|T|TRUE|ON|RUN)/ }
        }
        steps {
            sh 'echo booleans are tricky!'
        }
    }
}
```
More info about i.e. conditional execution can be found here: [Converting conditional to pipeline](https://www.jenkins.io/blog/2017/01/19/converting-conditional-to-pipeline).

There are a bunch of useful plugins that can be configured this way. If someone is working with BitBucket, I strongly recommend using the "Bitbucket Server Notifier Plugin for Jenkins".
The configuration is incredibly simple, and we will gain the ability to recognize whether our particular commit is building correctly in Jenkins by looking at BitBucket.
Further actions (like the possibility to merge the PR etc.) can be based on the commit build status.
As documented, we just need to add the proper `post` action for that purpose and... done!
```groovy
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Hello World'
                // currentBuild.result == null here
            }
        }
    }
    post {
        always {
            script {
                currentBuild.result = currentBuild.result ?: 'SUCCESS'
                notifyBitbucket()
            }
        }
    }
}
```

### Who does the job?
It is worth noting that in the case of the Jenkins Pipelines execution, both the master and the agent need to cooperate to run the script.
Basically speaking, the master spawns something called flyweight executors - unlimited and created automatically when needed, unlike heavyweight executors, which are limited based on their node’s configuration.
Flyweight executors are used to orchestrate the workload, and the real job is handled by the heavyweight executors on the defined agent. Still, if your Jenkins master is not permitted to spawn working threads, it will not be able to orchestrate the execution of the Jenkinsfile.

### Combining them together!
The combination of the Job DSL plugin and Jenkins Pipelines is incredibly powerful. We code not only the execution flow but the job and view creation itself. 
And everything spiced up by the Groovy syntax! A simple loop, a few variables and flows defined in Jenkinsfiles - entire projects ready to create in seconds!

### Credits:
- Photo by Jason Leung on Unsplash