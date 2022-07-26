const {expect} = require("chai");
const {ethers} = require("hardhat");

describe("Twitter Contract", function() {
  let Twitter;
  let twitter;
  let owner;

  const NUM_TOTAL_NOT_MY_TWEETS = 5;
  const NUM_TOTAL_MY_TWEETS = 3;

  beforeEach(async function() {
    Twitter = await ethers.getContractFactory("TwiterContract");
    [owner, addr1, addr2] = await ethers.getSigners();
    twitter = await Twitter.deploy();


    for(let i=0; i<NUM_TOTAL_NOT_MY_TWEETS; i++) {
      let tweet = {
        'tweetText': 'Ramdon text with id:- ' + i,
        'username': addr1,
        'isDeleted': false
      };

      await twitter.connect(addr1).addTweet(tweet.tweetText, tweet.isDeleted);
    }

    for(let i=0; i<NUM_TOTAL_MY_TWEETS; i++) {
      let tweet = {
        'username': owner,
        'tweetText': 'Ramdon text with id:- ' + (NUM_TOTAL_NOT_MY_TWEETS+i),
        'isDeleted': false
      };

      await twitter.connect(owner).addTweet(tweet.tweetText, tweet.isDeleted);
    }
  });

  describe("Add Tweet", function() {
    it("should emit AddTweet event", async function() {
      let tweet = {
        'tweetText': 'New Tweet',
        'isDeleted': false
      };

      await expect(await twitter.connect(owner).addTweet(tweet.tweetText, tweet.isDeleted)
    ).to.emit(twitter, 'AddTweet').withArgs(owner.address, NUM_TOTAL_NOT_MY_TWEETS + NUM_TOTAL_MY_TWEETS);
    })
  });

  describe("Get All Tweets", function() {
    it("should return the correct number of total tweets", async function() {
      const tweetsFromChain = await twitter.getAllTweets();
      expect(tweetsFromChain.length).to.equal(NUM_TOTAL_NOT_MY_TWEETS+NUM_TOTAL_MY_TWEETS);
    })

    it("should return the correct number of all my tweets", async function() {
      const myTweetsFromChain = await twitter.getMyTweets();//This will point to owner's address//
      expect(myTweetsFromChain.length).to.equal(NUM_TOTAL_MY_TWEETS);
    })
  });

  describe("Delete Tweet", function() {
    it("should emit delete tweet event", async function() {
      const TWEET_ID = 0;
      const TWEET_DELETED = true;

      await expect(
        twitter.connect(addr1).deletedTweet(TWEET_ID, TWEET_DELETED)
      ).to.emit(
        twitter, 'DeletedTweet'
      ).withArgs(
        TWEET_ID, TWEET_DELETED
      );
    });
  });
});
