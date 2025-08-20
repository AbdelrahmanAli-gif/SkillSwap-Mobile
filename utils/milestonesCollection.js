export const updateMilestone = async (tradeId, myMilestone, isUserA) => {
    try {
      const tradeDocRef = doc(db, "trades", tradeId)
      const tradeSnap = await getDoc(tradeDocRef)
      const tradeData = tradeSnap.data()
  
      if (isUserA) {
        // Get current milestonesA array
        const milestonesA = tradeData.milestonesA || []
  
        // Update the milestone with matching id
        const updatedMilestonesA = milestonesA.map((m) => (m.id === myMilestone.id ? myMilestone : m))
  
        // Update milestonesA in Firestore
        await updateDoc(tradeDocRef, {
          milestonesA: updatedMilestonesA,
        })
      } else {
        // Get current milestonesB array
        const milestonesB = tradeData.milestonesB || []
  
        // Update the milestone with matching id
        const updatedMilestonesB = milestonesB.map((m) => (m.id === myMilestone.id ? myMilestone : m))
  
        // Update milestonesB in Firestore
        await updateDoc(tradeDocRef, {
          milestonesB: updatedMilestonesB,
        })
      }
    } catch (error) {
      console.error("Error updating milestone:", error)
    }
  }
  
  export const updateTrade = async (tradeId, tradeData) => {
    try {
      const tradeDocRef = doc(db, "trades", tradeId)
      await updateDoc(tradeDocRef, tradeData)
    } catch (error) {
      console.error("Error updating trade:", error)
    }
  }
  