// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract TwiterContract{

    event AddTweet(address recipient, uint tweetId);
    event DeletedTweet(uint tweetId, bool isDeleted);

    struct Tweet{
        uint id;
        address username;
        string tweetText;
        bool isDeleted;
    }

    Tweet[] private tweets;

    //Mapping of tweet id to the wallet address of the user
    mapping(uint256=>address) tweetToOwner;

    function addTweet(string memory tweetText, bool isDeleted) external{
        uint tweetId=tweets.length;
        tweets.push(Tweet(tweetId, msg.sender, tweetText, isDeleted));
        tweetToOwner[tweetId]=msg.sender;
        emit AddTweet(msg.sender, tweetId);
    }

    //Methd to get all the Tweets
    function getAllTweets() external view returns(Tweet[] memory){
        Tweet[] memory temporary=new Tweet[](tweets.length);

        uint counter=0;
        for(uint i=0;i<tweets.length;i++){
            if(tweets[i].isDeleted==false){
                temporary[counter]=tweets[i];
                counter++;
            }
        }

        Tweet[] memory result=new Tweet[](counter);
        for(uint i=0;i<counter;i++){
            result[i]=temporary[i];
        }
        return result;   
    }

    function getMyTweets() external view returns(Tweet[] memory){
        Tweet[] memory temporary=new Tweet[](tweets.length);

        uint counter=0;
        for(uint i=0;i<tweets.length;i++){
            if(tweetToOwner[i]==msg.sender && tweets[i].isDeleted==false){
                temporary[counter]=tweets[i];
                counter++;
            }
        }

        Tweet[] memory result=new Tweet[](counter);
        for(uint i=0;i<counter;i++){
            result[i]=temporary[i];
        }
        return result;               
    }

    function deletedTweet(uint tweetId, bool isDeleted) external{
        if(tweetToOwner[tweetId]==msg.sender){
            tweets[tweetId].isDeleted=isDeleted;
            emit DeletedTweet(tweetId, isDeleted);
        }
    }
}
