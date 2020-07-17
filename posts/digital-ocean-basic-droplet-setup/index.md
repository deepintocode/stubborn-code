---
title: Digital Ocean Basic Droplet Setup
date: 2020-06-24
videoDuration: 7 mins
videoLink: https://youtu.be/Um_vDg4pCVE
description: "In this tutorial, we setup a basic Ubuntu 18.04 droplet in Digital Ocean."
---

{{ videoLink }}

This tutorial guides you through a basic Ubuntu 18.0.4 droplet setup on Digital Ocean.

We:

- <a href="#create-droplet" target="_self">Create an Ubuntu 18.04 droplet on Digital Ocean</a>
- <a href="#connect-to-droplet" target="_self">Connect to the droplet as the root account through SSH</a>
- <a href="#add-new-user" target="_self">Add a new user</a>
- <a href="#add-user-to-sudoers" target="_self">Add the user to the group of sudoers</a>
- <a href="#create-keygen" target="_self">Create a local keygen</a>
- <a href="#copy-keygen" target="_self">Copy the keygen to our server</a>
- <a href="#disable-password" target="_self">Disable SSH password authentication and enable public key authentication</a>
- <a href="#enable-firewall" target="_self">Setup ufw firewall</a>

If you haven't already, create a droplet on [Digital Ocean](https://www.digitalocean.com/)

In order to follow this tutorial, you need to select the Ubuntu distribution for your server.

Every other option is up to you.

<span id="create-droplet">This tutorial went with the following options:</span>

- Ubuntu 18.0.4 Distribution
- Standard Plan
- 1GB / 1 CPU - 25GB SSD Disk - 1000GB transfer - \$5/mo
- London datacenter
- Password Authentication _We disable password authentication and enable public key authentication later in the process_ (You need to type in a root password that you can always change later)

In order to connect to your droplet, you need a console emulator.

I'm on Windows, so I use [cmder](https://cmder.net/), which is based on [ConEmu](https://conemu.github.io/).
You can use one of these two if you are on Windows, or the native Terminal app if you're on a Mac or a Linux computer.

Copy the IP address of your newly created droplet and open your console emulator of your choice.

<span id="connect-to-droplet">Using the command below connect to your server:</span>

```
$ ssh root@ip_address_of_your_droplet_that_you_copied_from_digital_ocean
```

If it's your first time connecting to your droplet, you'll be faced with a message about the authenticity of the host. Select 'yes' to continue and enter the password you chose when you created the droplet.

For security reasons, we are going to add a new user. The root user has many privileges, but with many privileges, come great responsibilities, so it's better to avoid using the root account on a daily basis.

<span id="add-new-user">We create a new user with the following command:</span>

```
$ adduser username_of_your_choice
```

Enter a password and optionally add information for your new user.

This tutorial created an account with the username stubborn_code, so the rest of the guide is going to use that.

While, we don't want to use a root account as our main account, we sometimes need root privileges. To do that we can add this user to the group of sudoers. Users that belong to this group can execute commands that require root rights by using `sudo` in front of the command.

<span id="add-user-to-sudoers">Enter the following command to add our user to the group of sudoers:</span>

```
$ usermod -aG sudo stubborn_code
```

The -a flag means append and the -G flag means group. Used together we append to a group, in this case the sudo group.

We now want to add public key authentication in order to secure our server.

To do that, you generate a public key on your **local** machine, which you then copy to your server.

Your server holds the public keys of the devices that can connect to it, so other devices can't connect to it.
_If you want to use additional devices to connect to your server, make sure that you repeat the procedure and copy their keys to your server._

<span id="create-keygen">The following command generates an SSH key pair:</span>

```
$ ssh-keygen
```

On Windows, you will probably see something like this:

```
Generating public/private rsa key pair.
Enter file in which to save the key (C:\Users\windows_username/.ssh/id_rsa):
```

You can also choose to select a passphrase. In that case, you need to copy the key and you also need the passphrase every time you need to connect to your server.

If you press enter, you will generate a private key, `id_rsa` and a public key `id_rsa.pub`, which you need to copy to your droplet in the .ssh directory of the local user.

<span id="copy-keygen">To copy your public key to the server, you can either:</span>

- Use the ssh-copy-id command if it's available on your machine
- Copy the key manually

The first way is simpler and you only need to type the following:

```
$ ssh-copy-id droplet_username@droplet_ip
```

If you need to manually copy the key, you can use the following command on your local machine:

```
$ cat ~/.ssh/id_rsa.pub | ssh droplet_username@droplet_ip "cat >> ~/.ssh/authorized_keys"
```

This will copy the contents from your public key on your local machine, connect to your server and paste the key in an 'authorized_keys' file in the .ssh folder of your droplet user.

If the directory .ssh has not been created, which is more probable if you just created the droplet, you can use the command below that will create the directory before pasting the key:

```
$ cat ~/.ssh/id_rsa.pub | ssh user@123.45.56.78 "mkdir ~/.ssh; cat >> ~/.ssh/authorized_keys"
```

<span id="disable-password">We can disable the password authentication and enable public key authentication.</span>

To do that, we use the following command that gives us access to the sshd server configuration file:

```
$ sudo nano /etc/ssh/sshd_config
```

- Change the value of `PermitRootLogin` to 'no' if you want to disable root login.
- Find the `PasswordAuthentication` option. If it is commented out with a '#' symbol in front of it, delete the '#' symbol to uncomment it. Change its value to 'no'.
- Find the `PubkeyAuthentication` option. Again, uncomment it if it's commented and make sure its value is set to yes.

Click ctrl-X and select 'yes' to save the file.

In order to test the login, without logging out open a new tab and try to connect to your account. If all went well, you will be able to connect to your server without a password.

<span id="enable-firewall">Last thing we need to do is enable the ufw firewall.</span>

On your server, enter the following command:

```
$ sudo ufw app list
```

You should see OpenSSH under Available applications.

Run:

```
$ sudo ufw allow OpenSSH
```

to allow incoming SSH connections and

```
$ sudo ufw enable
```

to enable the firewall.

And that's it!

## You have now setup a basic droplet on Digital Ocean!
