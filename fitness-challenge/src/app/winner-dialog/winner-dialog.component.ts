import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { ethers } from 'ethers';
import { Container, Main } from 'tsparticles';
import { selectDisplayedChallenge } from '../ngrx/app.reducer';
import { ContractService } from '../services/contract.service';

export interface DialogData {
  id: number
}

@Component({
  selector: 'app-winner-dialog',
  templateUrl: './winner-dialog.component.html',
  styleUrls: ['./winner-dialog.component.scss']
})
export class WinnerDialogComponent implements OnInit {

  public particlesOptions: any = {
    "background": {
      "color": {
        "value": "#ea2d2d"
      },
      "opacity": 0
    },
    "fullScreen": {
      "enable": true
    },
    "particles": {
      "bounce": {
        "horizontal": {
          "value": 0
        },
        "vertical": {
          "value": 0
        }
      },
      "color": {
        "value": [
          "#1E00FF",
          "#FF0061",
          "#E1FF00",
          "#00FF9E"
        ],
        "animation": {
          "h": {
            "enable": true,
            "speed": 30
          }
        }
      },
      "move": {
        "decay": 0.1,
        "direction": "top",
        "enable": true,
        "gravity": {
          "enable": true,
          "maxSpeed": 200
        },
        "path": {},
        "outModes": {
          "default": "destroy",
          "bottom": "bounce",
          "left": "destroy",
          "right": "destroy",
          "top": "none"
        },
        "speed": {
          "min": 50,
          "max": 150
        },
        "spin": {}
      },
      "number": {
        "limit": 300,
        "value": 0
      },
      "opacity": {
        "animation": {
          "speed": 0.3,
          "sync": true,
          "destroy": "min",
          "startValue": "max"
        }
      },
      "roll": {
        "darken": {
          "enable": true,
          "value": 30
        },
        "enable": true,
        "enlighten": {
          "enable": true,
          "value": 30
        },
        "speed": {
          "min": 15,
          "max": 25
        }
      },
      "rotate": {
        "value": {
          "min": 0,
          "max": 360
        },
        "animation": {
          "enable": true,
          "speed": 60
        },
        "direction": "random"
      },
      "shape": {
        "options": {
          "polygon": [
            {
              "sides": 5
            },
            {
              "sides": 6
            }
          ],
          "character": [
            {
              "value": [
                "💩",
                "🤡",
                "🍀",
                "🍙"
              ]
            }
          ]
        },
        "type": [
          "circle",
          "square",
          "polygon",
          "character",
          "character",
          "character"
        ]
      },
      "size": {
        "animation": {}
      },
      "tilt": {
        "value": {
          "min": 0,
          "max": 360
        },
        "animation": {
          "enable": true,
          "speed": 60
        },
        "direction": "random",
        "enable": true
      },
      "wobble": {
        "distance": 30,
        "enable": true,
        "speed": {
          "min": -15,
          "max": 15
        }
      }
    },
    "emitters": {
      "autoPlay": true,
      "fill": true,
      "life": {
        "wait": false
      },
      "rate": {
        "quantity": 10,
        "delay": 0.1
      },
      "shape": "square",
      "startCount": 0,
      "size": {
        "mode": "percent",
        "height": 0,
        "width": 0
      },
      "position": {
        "x": 50,
        "y": 100
      }
    }
  }

  challenge$ = this.store.pipe(
    select(selectDisplayedChallenge)
  );

  constructor(
    public dialogRef: MatDialogRef<WinnerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public contractService: ContractService,
    public store: Store
  ) { }

  ngOnInit(): void {
  }

  redeemPrice() {
    this.contractService.redeemPrice(this.data.id).then(() => this.dialogRef.close());

  }

  particlesLoaded(container: Container): void {
    console.log(container);
  }

  formatEth(eth: string) {
    return ethers.utils.formatEther('' + eth);
  }

  particlesInit(main: Main): void {
    console.log(main);
    // loadConfettiShape(main);
    // Starting from 1.19.0 you can add custom presets or shape here, using the current tsParticles instance (main)
  }

}
