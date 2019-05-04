import * as shell from 'shelljs';
import {Servient} from '@node-wot/core';
import HttpServer from '@node-wot/binding-http/dist/http-server';
import TextCodec from '@node-wot/core/dist/codecs/text-codec';
import {delay} from 'rxjs/operators';


export class LedServient implements MyServient{

    private servient: Servient;

    constructor() {
        this.servient = new Servient();
        this.init();
    }

    private init() {
        this.servient.addServer(new HttpServer());
        this.servient.addMediaType(new TextCodec())
        shell.exec('sudo sh -c \'echo none > /sys/class/leds/led0/trigger\'');
        shell.exec('sudo sh -c \'echo 0  > /sys/class/leds/led0/brightness\'');
        shell.exec('sudo sh -c \'echo none > /sys/class/leds/led1/trigger\'');
        shell.exec('sudo sh -c \'echo 0 > /sys/class/leds/led1/brightness\'');
    }

    start() {
        this.servient.start().then( (myWot) => {
           let thing = myWot.produce({name: 'LED'});
           thing
           //RED LED
               .addProperty(
                   'RedLED',
                   { type: 'boolean'},
                    false
               )
               .setPropertyReadHandler(
                   'RedLED',
                   (value: any) => {
                       return new Promise((resolve, reject) => {
                           let state = this.getLedRed();
                           if (state == 0) {
                                resolve(false)
                            } else {
                                resolve(true)   
                            }
                       })
                   })
               .setPropertyWriteHandler(
                   'RedLED',
                   (value: any) => {
                       return new Promise((resolve, reject) => {
                            if (value === 'true') {
                                this.setLedRed(1)
                            } else {
                                this.setLedRed(0)
                            }
                            resolve(value);
                       })
                   })
                //GREEN LED
               .addProperty(
                   'GreenLED',
                   { type: 'boolean'},
                   false
               )
               .setPropertyReadHandler(
                   'GreenLED',
                   (value: any) => {
                       return new Promise((resolve, reject) => {
                           let state = this.getLedRed();
                           if (state == 0) {
                                resolve(false)
                            } else {
                                resolve(true)   
                            }    
                       })
                   })
               .setPropertyWriteHandler(
                   'GreenLED',
                   (value: any) => {
                       return new Promise((resolve, reject) => {
                            if (value == 'true') {
                                this.setLedGreen(1)
                            } else {
                                this.setLedGreen(0)
                            }
                           resolve(value);
                       })
                   })
           //ACTION
               .addAction(
                'BlinkGreenLED',
                   { },
                   ( ) => {
                       return new Promise((resolve, reject) => {
                           resolve();
                           for(let i = 0; i < 5; i++) {
                                    delay(2000)
                                    this.setLedGreen(1);
                                    delay(2000)
                                    this.setLedGreen(0)
                           }
                       });
                   }
               )

           thing.expose();
        })
    }
    
    setLedGreen(state) {
      shell.exec('sudo sh -c \'echo ' + state + ' > /sys/class/leds/led0/brightness\'');
    }
    
    getLedGreen() {
      return shell.exec('cat /sys/class/leds/led0/brightness').stdout;
    }

    
    setLedRed(state) {
      shell.exec('sudo sh -c \'echo ' + state + ' > /sys/class/leds/led1/brightness\'');
    }
    
    getLedRed() {
      return shell.exec('cat /sys/class/leds/led1/brightness').stdout;
    }
}
