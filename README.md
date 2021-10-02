<h1 align="center">
  CLEAN ARCHITECTURE API
</h1>

## :thinking: How to apply clean architecture?

<p align="center">
  <img alt="diagram" src="https://user-images.githubusercontent.com/40550247/134610213-ee24bd37-d43b-42ba-b866-7b18b875a9b0.png" />
</p>

* The diagram above is a visual representation of integrating all these architectures into a single actionable idea. As you can see, just doing the mental exercise of obeying these simple rules before coding a new system will save you a lot of headaches in the future. With this, if any of the technologies used in the system becomes obsolete (for example, the adopted web structure), you will be able to replace these elements without any problems. In practice, it's as simple as it sounds: by subdividing your project into layers you'll create a testable, readable, and easily optimizable system. In parallel, while defining the design layers in line with business rules and interface rules, it is essential to understand the relationship between application dependencies and entities.
  
  ### Principles
    * Single Responsibility Principle (SRP)
    * Open Closed Principle (OCP)
    * Liskov Substitution Principle (LSP)
    * Interface Segregation Principle (ISP)
    * Dependency Inversion Principle (DIP)
    * Separation of Concerns (SOC)
    * Don't Repeat Yourself (DRY)
    * You Aren't Gonna Need It (YAGNI)
    * Keep It Simple, Silly (KISS)
    * Composition Over Inheritance
  ### Design Patterns
    * Factory
    * Adapter
    * Composite
    * Decorator
    * Proxy
    * Dependency Injection
    * Abstract Server
    * Composition Root
    * Builder
    * Singleton
  ### Methodologies and Designs
    * TDD
    * Clean Architecture
    * DDD
    * Modular Design
    * Dependency Diagrams
    * Use Cases

## :rocket: Technologies

* [Node](https://nodejs.org/en/)

## :electric_plug: Prerequisites

- [Node version (= 14.17.5)](https://nodejs.org/en/)

## :information_source: Getting Started

1. Fork this repository and clone it on your machine.
2. Change the directory to `clean-architecture-api` where you cloned it.

## :closed_lock_with_key: Getting Started 

1. Install dependencies
```shell
$ npm install
```
2. Setup database
```shell
/* Create `.env` of the system */
$ cp .env.example .env

/* Run database with docker */
$ docker-compose up -d

/* Setting database, how create tables */
$ npm run prisma:push
```
3. Start the application
```shell
$ npm run dev
```
  * Open backend, the host [localhost:3333](http://localhost:3333)

## :toolbox: Running the tests

```shell
$ npm run test
```
---
