import React from 'react'
import InputField from '../InputField'

const JobPostingData = ({handleChange}) => {
    const now = new Date();
   // console.log(now)
   const twentyFourHoursAgo = new Date( now - 24 * 60 * 60 * 1000)
   const SevenDaysAgo = new Date( now - 7 * 24 * 60 * 60 * 1000)
   const ThirtyDaysAgo = new Date( now - 30 * 24 * 60 * 60 * 1000)
   //console.log(twentyFourHoursAgo)

   //convert date to string
   const twentyFourHoursAgoDate = twentyFourHoursAgo.toISOString().slice(0, 10)
   const SevenDaysAgoDate = SevenDaysAgo.toISOString().slice(0, 10)
   const ThirtyDaysAgoData = ThirtyDaysAgo.toISOString().slice(0, 10)
   
   //console.log(twentyFourHoursAgoDate)
  return (
    <div>
    <h4 className="text-lg font-medium mb-2">Date of posting:</h4>

    <div>
        <label className="sidebar-label-container">
            <input 
            type="radio" 
            name="test"
             id="test" 
             value=""
              onChange={handleChange} 
              />
            <span className="checkmark"></span>All time
        </label>

        <InputField
        handleChange={handleChange} 
        value={twentyFourHoursAgoDate}
        title="Last 24 hours"
         name="test"
         />

       <InputField 
        handleChange={handleChange} 
        value={SevenDaysAgoDate}
        title="Last 7 days"
         name="test"
         />

      <InputField 
        handleChange={handleChange} 
        value={ThirtyDaysAgoData}
        title="Last Month"
         name="test"
         />

        
        
    </div>
</div>
  )
}

export default JobPostingData