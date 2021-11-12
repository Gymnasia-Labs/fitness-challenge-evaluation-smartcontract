import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AuthService } from '../services/auth.service';
import { Concept2Service } from '../services/concept2.service';
import { selectChallengeById, selectConcept2DataLoading, selectConcept2Name, selectDisplayedChallenge, selectTrainingData, selectTrainingsForDisplayedChallenge } from '../ngrx/app.reducer';
import { TrainingData } from '../models/training.data';
import { from, merge, of, Subscription, timer } from 'rxjs';
import { fetchChallenges, fetchConcept2Data, setConcept2DataLoading, setDisplayedChallenge } from '../ngrx/app.actions';
import { DomSanitizer } from '@angular/platform-browser';
import { ContractService } from '../services/contract.service';
import { delay, filter, map, mergeMap, retry, switchMap, take, tap, timeout } from 'rxjs/operators';
import { Challenge, LeaderBoard } from '../models/challenge';
import { Container, Main } from 'tsparticles';
import { loadConfettiShape } from "tsparticles-shape-confetti";
import { MatDialog } from '@angular/material/dialog';
import { WinnerDialogComponent } from '../winner-dialog/winner-dialog.component';



export interface PeriodicElement {
  distance: string,
  time: string,
  account: string
}

export const CHALLENGE_ID: string = 'challenge_id';

const ELEMENT_DATA: PeriodicElement[] = [
  { distance: '1500m', time: '3:21 secs', account: 'Account #0001', },
  { distance: '1500m', time: '3:34 secs', account: 'Account #0002', },
  { distance: '1500m', time: '3:57 secs', account: 'Account #0003', },
];

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})

export class ChallengeComponent implements OnInit, OnDestroy {
  safeURL: any;

  dataSource$ = ELEMENT_DATA;
  id: number = -1;
  particlesId: any = "tsparticles";
  public isWinner: boolean = false;

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

  logData$ = this.store.pipe(
    select(selectTrainingsForDisplayedChallenge)
  );

  concept2Loading$ = this.store.pipe(
    select(selectConcept2DataLoading)
  );

  clickedRow: TrainingData | undefined;

  displayedColumnsLog: string[] = [
    // 'submit',
    'date',
    // 'brand', 
    'type',
    'distance',
    'time',
    // 'pace', 
    // 'hearthRate',
    'submit'
  ];

  leaderboard: LeaderBoard[] = [];

  challenge$ = this.store.pipe(
    select(selectDisplayedChallenge)
  );
  winnerSubscription: Subscription | null = null;

  constructor(
    private actRoute: ActivatedRoute,
    private store: Store,
    private authService: AuthService,
    private concept2: Concept2Service,
    private _sanitizer: DomSanitizer,
    public contractService: ContractService,
    public dialog: MatDialog
  ) {
    // this.store.dispatch({ type: fetchChallenges });
    this.id = +this.actRoute.snapshot.params.id;
    this.store.dispatch(setDisplayedChallenge({ id: this.id }));
    this.logData$ = this.store.pipe(
      select(selectTrainingsForDisplayedChallenge)
    );
    // this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl('https://youtu.be/dQw4w9WgXcQ');
    // this.checkWinner();
    this.getLeaderboard();
  }
  ngOnDestroy(): void {
    this.winnerSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.checkWinner();
  }

  concept2Name$ = this.store.pipe(
    select(selectConcept2Name)
  );

  getLoginURL(brand: string) {
    return this.authService.getLoginLink(brand);
  }

  async checkWinner() {
    console.log('checkwinner called');
    await new Promise<void>((resolve, reject) => {
      this.contractService.provider.once("block", (block: any) => {
        resolve();
      })
    });
    this.winnerSubscription =
      this.challenge$.pipe(
        filter(challenge => challenge),
        tap(challenge => console.log(challenge, challenge.redeemed)),
        filter(challenge => !challenge.redeemed),
        switchMap(() => from(this.contractService.isWinner(this.id))),
        tap(console.log),
        filter(Boolean),
        // retry(100),
      ).subscribe(
        () => this.dialog.open(WinnerDialogComponent, {
          width: '80%',
          height: '35%',
          data: { id: this.id }
        })
      );
  }

  particlesLoaded(container: Container): void {
    console.log(container);
  }

  isLive() {
    return this.challenge$.pipe(
      map(challenge => {
        let now = new Date();
        return now >= challenge?.start && now <= challenge?.end;
      })
    );

  }

  particlesInit(main: Main): void {
    console.log(main);
    // loadConfettiShape(main);
    // Starting from 1.19.0 you can add custom presets or shape here, using the current tsParticles instance (main)
  }

  loginConcept2() {
    // this.authService.login().subscribe(
    //   r => console.log('res',r)
    // );
  }

  getUserDataOf(user?: string) {
    if (!user) user = 'me';

    this.concept2.getUserData(user).subscribe(console.log)
  }

  getChallengeDataOf(user?: string) {
    if (!user) user = 'me';
    user = '491';
    this.concept2.getResultsData(user).subscribe(console.log)
  }

  getStrokeData(user?: string, resultId?: string) {
    if (!user) user = 'me';
    if (!resultId) resultId = '55327159'
    this.concept2.getStrokesData(user, resultId).subscribe(console.log)
  }

  getLoginLink(brand: string) {
    return this.authService.getLoginLink(brand);
  }

  refresh() {
    this.store.dispatch(setConcept2DataLoading({ isLoading: true }));
    this.store.dispatch({ type: fetchConcept2Data });

  }

  saveChallengeId() {
    localStorage.setItem(CHALLENGE_ID, '' + this.id);
  }

  submit(element: any) {
    console.log(element);
    this.challenge$.pipe(
      take(1),
      switchMap(challenge => this.contractService.submitChallenge(this.id, element.distance, element.time, challenge.fee))
    ).subscribe();

  }

  redeemPrice() {
    this.contractService.redeemPrice(this.id)
  }

  getLeaderboard() {
    return this.contractService.getLeaderBoard(this.id).then(leaderBoard => {
      this.leaderboard = leaderBoard
    });
  }



}
