var mongoose = require('mongoose');

var MatchSchema = new mongoose.Schema({
  matchVersion: String,
  region: String,
  mapId: Number,
  season: String,
  queueType: String,
  matchDuration: Number,
  matchCreation: Number,
  matchType: String,
  matchId: Number,
  participants: [{
    masteries: [{
      rank: Number,
      masteryId: Number
    }],
    stats:{
      unrealKills: Number,
      item0: Number,
      item1: Number,
      item2: Number,
      item3: Number,
      item4: Number,
      item5: Number,
      item6: Number,
      totalDamageTaken: Number,
      pentaKills: Number,
      sightWardsBoughtInGame: Number,
      winner: Boolean,
      magicDamageDealt: Number,
      wardsKilled: Number,
      largestCriticalStrike: Number,
      trueDamageDealt: Number,
      doubleKills: Number,
      physicalDamageDealt: Number,
      tripleKills: Number,
      deaths: Number,
      firstBloodAssist: Boolean,
      magicDamageDealtToChampions: Number,
      assists: Number,
      visionWardsBoughtInGame: Number,
      totalTimeCrowdControlDealt: Number,
      champLevel: Number,
      physicalDamageTaken: Number,
      totalDamageDealt: Number,
      largestKillingSpree: Number,
      inhibitorKills: Number,
      minionsKilled: Number,
      towerKills: Number,
      physicalDamageDealtToChampions: Number,
      quadraKills: Number,
      goldSpent: Number,
      totalDamageDealtToChampions: Number,
      goldEarned: Number,
      neutralMinionsKilledTeamJungle: Number,
      firstBloodKill: Boolean,
      firstTowerKill: Boolean,
      wardsPlaced: Number,
      trueDamageDealtToChampions: Number,
      killingSprees: Number,
      firstInhibitorKill: Boolean,
      totalScoreRank: Number,
      totalUnitsHealed: Number,
      kills: Number,
      firstInhibitorAssist: Boolean,
      totalPlayerScore: Number,
      neutralMinionsKilledEnemyJungle: Number,
      magicDamageTaken: Number,
      largestMultiKill: Number,
      totalHeal: Number,
      objectivePlayerScore: Number,
      firstTowerAssist: Boolean,
      trueDamageTaken: Number,
      neutralMinionsKilled: Number,
      combatPlayerScore: Number,
    },
    runes: [{
      rank: Number,
      runeId: Number
    }],
    timeline: {
      ancientGolemAssistsPerMinCounts:
      {
        zeroToTen: Number,
        tenToTwenty: Number,
        twentyToThirty: Number,
        thirtyToEnd: Number
      },
       // ParticipantTimelineData Ancient golem assists per minute timeline counts
      ancientGolemKillsPerMinCounts: {
        zeroToTen: Number,
        tenToTwenty: Number,
        twentyToThirty: Number,
        thirtyToEnd: Number
      },
         // ParticipantTimelineData Ancient golem kills per minute timeline counts
      assistedLaneDeathsPerMinDeltas:  {
        zeroToTen: Number,
        tenToTwenty: Number,
        twentyToThirty: Number,
        thirtyToEnd: Number
      },
       // ParticipantTimelineData Assisted lane deaths per minute timeline data
      assistedLaneKillsPerMinDeltas: {
        zeroToTen: Number,
        tenToTwenty: Number,
        twentyToThirty: Number,
        thirtyToEnd: Number
      },
       // ParticipantTimelineData Assisted lane kills per minute timeline data
      baronAssistsPerMinCounts: {
        zeroToTen: Number,
        tenToTwenty: Number,
        twentyToThirty: Number,
        thirtyToEnd: Number
      },
       // ParticipantTimelineData Baron assists per minute timeline counts
      baronKillsPerMinCounts: {
        zeroToTen: Number,
        tenToTwenty: Number,
        twentyToThirty: Number,
        thirtyToEnd: Number
      },
       // ParticipantTimelineData Baron kills per minute timeline counts
      creepsPerMinDeltas: {
        zeroToTen: Number,
        tenToTwenty: Number,
        twentyToThirty: Number,
        thirtyToEnd: Number
      },
       // ParticipantTimelineData Creeps per minute timeline data
      csDiffPerMinDeltas: {
        zeroToTen: Number,
        tenToTwenty: Number,
        twentyToThirty: Number,
        thirtyToEnd: Number
      },
       // ParticipantTimelineData Creep score difference per minute timeline data
      damageTakenDiffPerMinDeltas: {
        zeroToTen: Number,
        tenToTwenty: Number,
        twentyToThirty: Number,
        thirtyToEnd: Number
      },
       // ParticipantTimelineData Damage taken difference per minute timeline data
      damageTakenPerMinDeltas: {
        zeroToTen: Number,
        tenToTwenty: Number,
        twentyToThirty: Number,
        thirtyToEnd: Number
      },
       // ParticipantTimelineData Damage taken per minute timeline data
      dragonAssistsPerMinCounts: {
        zeroToTen: Number,
        tenToTwenty: Number,
        twentyToThirty: Number,
        thirtyToEnd: Number
      },
       // ParticipantTimelineData Dragon assists per minute timeline counts
      dragonKillsPerMinCounts: {
        zeroToTen: Number,
        tenToTwenty: Number,
        twentyToThirty: Number,
        thirtyToEnd: Number
      },
       // ParticipantTimelineData Dragon kills per minute timeline counts
      elderLizardAssistsPerMinCounts:  {
        zeroToTen: Number,
        tenToTwenty: Number,
        twentyToThirty: Number,
        thirtyToEnd: Number
      },
       // ParticipantTimelineData Elder lizard assists per minute timeline counts
      elderLizardKillsPerMinCounts:  {
        zeroToTen: Number,
        tenToTwenty: Number,
        twentyToThirty: Number,
        thirtyToEnd: Number
      },
       // ParticipantTimelineData Elder lizard kills per minute timeline counts
      goldPerMinDeltas: {
        zeroToTen: Number,
        tenToTwenty: Number,
        twentyToThirty: Number,
        thirtyToEnd: Number
      },
       // ParticipantTimelineData Gold per minute timeline data
      inhibitorAssistsPerMinCounts:  {
        zeroToTen: Number,
        tenToTwenty: Number,
        twentyToThirty: Number,
        thirtyToEnd: Number
      },
       // ParticipantTimelineData Inhibitor assists per minute timeline counts
      inhibitorKillsPerMinCounts:  {
        zeroToTen: Number,
        tenToTwenty: Number,
        twentyToThirty: Number,
        thirtyToEnd: Number
      },
       // ParticipantTimelineData Inhibitor kills per minute timeline counts
      lane: String,
       // string  Participant's lane (Legal values: MID, MIDDLE, TOP, JUNGLE, BOT, BOTTOM)
      role: String,
       // string  Participant's role (Legal values: DUO, none, SOLO, DUO_CARRY, DUO_SUPPORT)
      towerAssistsPerMinCounts: {
        zeroToTen: Number,
        tenToTwenty: Number,
        twentyToThirty: Number,
        thirtyToEnd: Number
      },
       // ParticipantTimelineData Tower assists per minute timeline counts
      towerKillsPerMinCounts: {
        zeroToTen: Number,
        tenToTwenty: Number,
        twentyToThirty: Number,
        thirtyToEnd: Number
      },
       // ParticipantTimelineData Tower kills per minute timeline counts
      towerKillsPerMinDeltas:  {
        zeroToTen: Number,
        tenToTwenty: Number,
        twentyToThirty: Number,
        thirtyToEnd: Number
      },
       // ParticipantTimelineData Tower kills per minute timeline data
      vilemawAssistsPerMinCounts:  {
        zeroToTen: Number,
        tenToTwenty: Number,
        twentyToThirty: Number,
        thirtyToEnd: Number
      },
       // ParticipantTimelineData Vilemaw assists per minute timeline counts
      vilemawKillsPerMinCounts: {
        zeroToTen: Number,
        tenToTwenty: Number,
        twentyToThirty: Number,
        thirtyToEnd: Number
      },
       // ParticipantTimelineData Vilemaw kills per minute timeline counts
      wardsPerMinDeltas: {
        zeroToTen: Number,
        tenToTwenty: Number,
        twentyToThirty: Number,
        thirtyToEnd: Number
      },
       // ParticipantTimelineData Wards placed per minute timeline data
      xpDiffPerMinDeltas:  {
        zeroToTen: Number,
        tenToTwenty: Number,
        twentyToThirty: Number,
        thirtyToEnd: Number
      },
       // ParticipantTimelineData Experience difference per minute timeline data
      xpPerMinDeltas: {
        zeroToTen: Number,
        tenToTwenty: Number,
        twentyToThirty: Number,
        thirtyToEnd: Number
      },
         // ParticipantTimelineData Experience per minute timeline data
    },
    spell2Id: Number,
    participantId: Number,
    championId: Number,
    teamId: Number,
    highestAchievedSeasonTier: String,
    spell1Id: Number,
  }],
  matchMode: String,
  platformId: String,
  participantIdentities: [{
    player: {
      profileIcon: Number,
      matchHistoryUri: String,
      summonerName: String,
      summonerId: Number
    },
    participantId: Number
  }]
});

module.exports = mongoose.model('Match', MatchSchema);
