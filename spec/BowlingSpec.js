describe('Bowling', function() {
  var bowling;

  beforeEach(function() {
    var fakeFrame = {
      frameNumber: 1,
      pendingFrames: 0,
      ballOne: 0,
      ballTwo: 0,
      bonusScore: 0,
      fakeFrame: true
    };
    bowling = new Bowling(fakeFrame);
  })

  describe('default state', function() {

    it('knows it is the first frame', function() {
      expect(bowling.currentFrame.frameNumber).toEqual(1);
    })

    it('knows it is the first ball', function() {
      expect(bowling.currentBall).toEqual(1);
    })
  })

  describe('progressing the game', function() {

    it('moves to the 2nd ball', function() {
      bowling.bowl(1);
      expect(bowling.currentBall).toEqual(2);
    })

    it('can roll a gutterball', function() {
      bowling.bowl(0);
      expect(bowling.currentFrame.ballOne).toEqual(0);
      expect(bowling.currentBall).toEqual(2)
    })

    it('adds 1st score to current frame', function() {
      bowling.bowl(1);
      expect(bowling.currentFrame.ballOne).toEqual(1);
    })

    it('adds 2nd score to current frame', function() {
      bowling.bowl(1);
      bowling.bowl(2);
      expect(bowling.completedFrames[0].ballTwo).toEqual(2);
    })

    it('goes back to ball 1', function() {
      bowling.bowl(1);
      bowling.bowl(2);
      expect(bowling.currentBall).toEqual(1);
    })

    it('goes to frame 2', function() {
      bowling.bowl(1);
      bowling.bowl(2);
      console.log(bowling.currentFrame)
      expect(bowling.frameNumber).toEqual(2);
    })

  })

  describe('spares', function() {
    it('moves frame to pending', function() {
      bowling.bowl(3);
      bowling.bowl(7);
      expect(bowling.pendingFrames[0].frameNumber).toEqual(1);
    })

    it('gives frame 1 pending count', function() {
      bowling.bowl(3);
      bowling.bowl(7);
      expect(bowling.pendingFrames[0].pendingFrames).toEqual(1);
    })

    it('moves pending frame to complete', function() {
      bowling.bowl(3);
      bowling.bowl(7);
      bowling.bowl(3);
      expect(bowling.pendingFrames).toEqual([]);
    })

    it('adds bonus scores to spare frames', function() {
      bowling.bowl(3);
      bowling.bowl(7);
      bowling.bowl(3);
      expect(bowling.completedFrames[0].bonusScore).toEqual(3);
    })

  })

  describe('strikes', function() {

    it('moves frame to pending', function() {
      bowling.bowl(10);
      expect(bowling.pendingFrames[0].frameNumber).toEqual(1);
    })

    it('gives frame 2 pending count', function() {
      bowling.bowl(10);
      expect(bowling.pendingFrames[0].pendingFrames).toEqual(2);
    })

    it('adds bonus scores to strike frames', function() {
      bowling.bowl(10);
      bowling.bowl(2);
      expect(bowling.pendingFrames[0].pendingFrames).toEqual(1);
    })

    it('adds bonus scores to strike frames', function() {
      bowling.bowl(10);
      bowling.bowl(2);
      expect(bowling.pendingFrames[0].bonusScore).toEqual(2);
    })

    it('adds bonus scores to strike frames again', function() {
      bowling.bowl(10);
      bowling.bowl(2);
      bowling.bowl(1);
      expect(bowling.completedFrames[0].bonusScore).toEqual(3);
    })
  })

  describe('tenth frame', function() {

    it('allows a third ball' , function(){
      bowling.frameNumber = 10;
      bowling.bowl(2);
      bowling.bowl(8);
      expect(bowling.frameNumber).toEqual(10)
    })
  })
})
