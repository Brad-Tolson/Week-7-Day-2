function calculateTripInfo(tripSegments) {
    let totalTime = 0;
    let avgSpeedLimits = [];
    let segmentTimes = [];
    
    for (let i = 0; i < tripSegments.length; i++) {
      const segment = tripSegments[i];
      const { speedLimits, traffic } = segment;
      
      let segmentTime = 0;
      let totalDistance = 0;
      let totalWeightedSpeedLimit = 0;
      
      for (let j = 0; j < speedLimits.length; j++) {
        const { distance, speedLimit } = speedLimits[j];
        totalDistance += distance;
        totalWeightedSpeedLimit += distance * speedLimit;
        segmentTime += distance / speedLimit;
      }
      
      segmentTime = segmentTime * (1 + (traffic / 100));
      segmentTimes.push(Math.round(segmentTime));
      avgSpeedLimits.push(Math.round(totalWeightedSpeedLimit / totalDistance));
      totalTime += segmentTime;
    }
    
    return {
      segmentTimes,
      avgSpeedLimits,
      totalTime: Math.round(totalTime)
    };
  }

  const tripSegments = [
    {
      name: `Jake's Great Shakes`,
      speedLimits: [
        {
          distance: 100,
          speedLimit: 75
        },
        {
          distance: 84,
          speedLimit: 70
        },
        {
          distance: 20,
          speedLimit: 75
        }
      ],
      traffic: 30
    },
    {
      name: 'Taco Bell',
      speedLimits: [
        {
          distance: 120,
          speedLimit: 70
        },
        {
          distance: 80,
          speedLimit: 65
        },
        {
          distance: 50,
          speedLimit: 60
        }
      ],
      traffic: 20
    }
  ];
  
  const tripInfo = calculateTripInfo(tripSegments);
  
  console.log(tripInfo);
  