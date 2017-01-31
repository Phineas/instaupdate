![Instaupdate logo](https://phineas.io/screenshots/instaupdate-logo.png)

[![Travis CI](https://api.travis-ci.org/Phineas/instaupdate.svg?branch=master)](https://travis-ci.org/Phineas/instaupdate)

Update your name, location, URL, descriptions (bios), banners and much more on every website at once.

## Usage

# DEPRECATED
As this project now uses babel to compile, we will create a npm repo to publish the project. More details soon!

First, you will need to clone this repo using:

```shell
git clone https://github.com/Phineas/instaupdate.git
cd instaupdate
```

Then, you need to change and add all the details of your accounts in the [config.json](data/config.json) file.

Next, you will need to change your profile details in the [profile.json](data/profile.json) file. You can use ``null`` if you wouldn't like to change an specific value.

Once you are done, you can simply use ``node index.js`` and the script will do everything for you!

## TODOs

- Change structures to ES6 classes
- Use Promises
- Implement YouTube