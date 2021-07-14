[coc]: https://github.com/Welcome-Bot/welcome-bot/blob/main/.github/CODE_OF_CONDUCT.md
[discussion]: https://github.com/Welcome-Bot/welcome-bot/discussions
[bug]: https://github.com/Welcome-Bot/welcome-bot/issues/new?template=bug_report.md
[feature]: https://github.com/Welcome-Bot/welcome-bot/issues/new?template=feature_request.md
[issues]: https://github.com/Welcome-Bot/welcome-bot/issues/
[featureReqs]: https://github.com/Welcome-Bot/welcome-bot/issues?q=is%3Aissue+is%3Aopen+label%3A%22Type%3A+enhancement%22
[issue]: https://github.com/Welcome-Bot/welcome-bot/issues/new
[crowdin]: https://crowdin.com/project/welcome-bot
[TRANSLATORS.md]: https://github.com/Welcome-Bot/welcome-bot/blob/main/TRANSLATORS.md
[Discord]: https://dsc.gg/welcome-bot-guild
[fork]: https://github.com/Welcome-Bot/welcome-bot/fork

# Contributing to Welcome-Bot

First of all, thank you for considering to contribute towards Welcome-Bot.

To make sure that your contribution follows certain standards did we set up these basic Guidelines that you should read and follow.
If you're unsure about a specific part of the Guidelines, use your best judgement or ask us for clarification.

## Code of Conduct

This project and everyone participating in it is governed by the [Code of Conduct][coc].
By participating, you are expected to uphold this code. Please report unacceptable behavior through e-mail to baalkrshna@gmail.com.

## Translation

One of our main goals is to make Welcome-Bot avaliable as many people as possible, and that's why we are making together an awesome team from all around the globe.  
Do you want to be a part of it? Awesome! We translate our strings through **Crowdin**, a platform made for software localisation.
Go to [our Crowdin page][crowdin] and join the team.
After that, join our community server and ping one of the translation managers so they can give you your roles on our [Discord].  
**Ah, and did we mention that to support translators, we add his/her name to a file in our repo, [TRANSLATORS.md]**

## Ideas and discussion

Have an awesome idea for a new command?
We'd love to hear about it, no matter how useful it is.
Go for it, and please open an [feature request][feature] describing what you have in mind.
We'll discuss it and, quite possibly, add it to the bot!
You can also help by giving your opinion on one of the many existing ideas we have on our [issues] list.

## Reporting bugs

Found something not working in the bot?
Please let us know! Don't hesitate to [write a bug report][bug].
Please give us as much information as you can, preferably filling all of the fields provided on the template.

## Writing code

If you know how to code in JavaScript, then feel free to give [one of the existent ideas][featureReqs] a try.
[Fork this repository][fork], make some changes and then open a pull request!

Also note, we recommend to use descriptive commit names to prepare the Changelog easily.
Read that below in [Commit names](#commit-names)

> ⚠ Please don't open Pull Requests with features that haven't been discussed as [issues][featureReqs] yet.
> We don't want you to waste time writing a feature that might get denied.
> If you have an idea and want it to be in the bot, check the [Ideas and discussion](#ideas-and-dicussion) paragraph above.

<!--Below lines took from https://github.com/angular/material/blob/master/.github/CONTRIBUTING.md#-commit-message-format-->

## Commit names

Each commit message consists of a **header**, a **body** and a **footer**. The header has a special
format that includes a **type**, a **scope**, and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

> Any line of the commit message cannot be longer 100 characters!<br/>
  This allows the message to be easier to read on GitHub as well as in various Git tools.

##### Type

Must be one of the following:

* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing
  semi-colons, etc)
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **perf**: A code change that improves performance
* **test**: Adding missing tests
* **chore**: Changes to the auxiliary tools such as release scripts
* **build**: Changes to the dependencies, devDependencies, or build tooling
* **ci**: Changes to our Continuous Integration configuration

##### Scope

The scope could be anything that helps specify the scope (or feature) that is changing.

Examples
- fix(select): 
- docs(menu): 

##### Subject

The subject contains a succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize first letter
* no period (.) at the end

##### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

##### Footer

The footer should contain any information about **Breaking Changes** and is also the place to
reference GitHub issues that this commit **Closes**, **Fixes**, or **Relates to**.

> We highlight Breaking Changes in the ChangeLog. These are as changes that will require
  community users to modify their code after updating to a version that contains this commit.

##### Sample Commit messages

```text
fix(autocomplete): don't show the menu panel when readonly

- this could sometimes happen when no value was selected

Fixes #11231
```

```text
feat(chips): trigger ng-change on chip addition/removal

- add test of `ng-change` for `md-chips`
- add docs regarding `ng-change` for `md-chips` and `md-contact-chips`
- add demo for ng-change on `md-chips`
- add demo for ng-change on `md-contact-chips`

Fixes #11161, #3857
```

```text
refactor(content): prefix mdContent scroll- attributes

    BREAKING CHANGE: md-content's `scroll-` attributes are now prefixed with `md-`.

    Change your code from this:
    ```html
    <md-content scroll-x scroll-y scroll-xy>
    ```

    To this:
    ```html
    <md-content md-scroll-x md-scroll-y md-scroll-xy>
    ```
```
