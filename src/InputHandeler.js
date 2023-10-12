export default class InputHandler {
    constructor(game) {
        this.shootTimer = 0;
        this.game = game
        window.addEventListener('keydown', (event) => {
            console.log(event.key)
            if (
              (event.key === 'ArrowUp' 
              || event.key === 'ArrowDown' 
              || event.key === 'ArrowLeft' 
              || event.key === 'ArrowRight'
              || event.key === 'w'
              || event.key === 'a'
              || event.key === 's'
              || event.key === 'd') &&
              this.game.keys.indexOf(event.key) === -1
            ) {
              this.game.keys.push(event.key)
            }


              if (event.key === 'x') {
                this.game.player.shoot()
              }
              if (event.key === 'z')
              this.game.player.strike()


            if (event.key === 'p') {
              this.game.debug = !this.game.debug
            }
      })
      window.addEventListener('keyup', (event) => {
        if (this.game.keys.indexOf(event.key) > -1) {
          this.game.keys.splice(this.game.keys.indexOf(event.key), 1)
        }
      })
    }
  }