import React from 'react'
import InputField from '../InputField'

const Location = ({handleChange}) => {
  return (
    <div>
        <h4 className="text-lg font-medium mb-2">Location</h4>

        <div>
            <label className="sidebar-label-container">
                <input 
                type="radio" 
                name="test"
                 id="test" 
                 value=""
                  onChange={handleChange} 
                  />
                <span className="checkmark"></span>All
            </label>

            <InputField 
            handleChange={handleChange} 
            value="bangalore" 
            title="Bangalore"
             name="test"
             />

           <InputField 
            handleChange={handleChange} 
            value="chennai" 
            title="Chennai"
             name="test"
             />

          <InputField 
            handleChange={handleChange} 
            value="gurgaon" 
            title="Gurgaon"
             name="test"
             />

             <InputField 
            handleChange={handleChange} 
            value="mangalore" 
            title="Mangalore"
             name="test"
             />
        </div>
    </div>
  )
}

export default Location