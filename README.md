# WoT-Raspberry-Pi-Servient
This is a simple implementation of a WoT Raspberry PI Servient on NodeJS to control the internal status LEDs. It is based on the [Eclipse Thingweb node-wot](https://github.com/eclipse/thingweb.node-wot/) implementation of the W3C Web of Things. 

# Requirments
*  NodeJs
*  npm

# Quick Start
Clone the repository:
```
git clone https://github.com/tejoha/WoT-Raspberry-Pi-Servient.git
```
Go into:
```
cd WoT-Raspberry-Pi-Servient
```
Install dependencies:
```
npm install
```
Run:
```
npm start
```


### HTTP Resources
The Servient will gererate follwing HTTP url bindings. The **Thing Description** will be aviable under **localhost:8080/LED**.

![](https://github.com/tejoha/WoT-Raspberry-Pi-Servient/blob/master/img/url-binding.jpg)


### Using a browser
Open [WoT Browser](https://github.com/eclipse/thingweb.node-wot/#using-a-browser) and consume Thing Description (localhost:8080/LED).

# Test environment
*  Raspberry PI 3 Model B V1.2
*  Raspbian GNU/Linux 9.9
