'use client'

import { IoFilterSharp } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";

import './index.css'
import giftData from './data'

import { useState } from "react";
import Link from "next/link";

export default function Home() {

  // modal state
  const [isModalOpen, setIsModalOpen] = useState(false)

  // filter state object
  const [filterState, setFilterState] = useState<{ageGroup: string, occasion: string, interests: string[]}>({ageGroup: '', occasion: '', interests: []})

  // choice component
  const Choice = ({title, value, type, borderColor} : {title: string, value: string, type: string, borderColor: string}) => {

    const isChecked = filterState.ageGroup === value || filterState.interests.includes(value) || filterState.occasion === value
    const onClick = () => {
      if (type === "ageGroup") {
        if (filterState.ageGroup === value) {
          return setFilterState(prevFilterState => {return {...prevFilterState, ageGroup: ''}})
        } else {
          return setFilterState(prevFilterState => {return {...prevFilterState, ageGroup: value}})
        }
      } 
      if (type === "occasion") {
        if (filterState.occasion === value) {
          return setFilterState(prevFilterState => {return {...prevFilterState, occasion: ''}})
        } else {
          return setFilterState(prevFilterState => {return {...prevFilterState, occasion: value}})
        }
      } 
      if (type === "interest") {
        if (filterState.interests.includes(value)) {
          const updatedInterests = filterState.interests.filter(interest => interest !== value)
          return setFilterState(prevFilterState => {return {...prevFilterState, interests: updatedInterests}})
        } else {
          return setFilterState(prevFilterState => {return {...prevFilterState, interests: [...prevFilterState.interests, value]}})
        }
      }
    }

    return (
      <div 
      onClick={onClick}
      className="w-fit cursor-pointer" 
      style={{border: `2px solid ${borderColor}`, color: isChecked && borderColor === 'white' ? 'black' : 'white', backgroundColor: isChecked ? borderColor : undefined, borderRadius: '25px', padding: '5px 15px'}}>
        {title}
      </div>
    )
  }

  // age group filtering choices and markup
  const ageGroups = [
    {title: '18-24 years old', value: '18-24'}, 
    {title: '25-34 years old', value: '25-34'}, 
    {title: '35-44 years old', value: '35-44'}, 
    {title: '45-54 years old', value: '45-54'}, 
    {title: '55+ years old', value: '55+'}
  ]
  const ageGroupFilterChoicesMarkup = ageGroups.map((group, index) => <Choice key={index} title={group.title} value={group.value} type="ageGroup" borderColor="#5ab9ff" />)

  // occasion filtering choices and markup
  const occasions = [
    {title: 'Birthday', value: 'birthday'}, 
    {title: 'Christmas', value: 'christmas'}, 
    {title: "Father's Day", value: 'father'}
  ]
  const occasionFilterChoicesMarkup = occasions.map((occasion, index) => <Choice key={index} title={occasion.title} value={occasion.value} type="occasion" borderColor="white" />)

  // interest filtering choices and markup
  const interests = [
    {title: 'Tech & Gadgets', value: 'tech'}, 
    {title: 'Fitness', value: 'fitness'},
    {title: 'Golf', value: 'golf'},
    {title: 'Music', value: 'music'},
    {title: 'Home Improvement & DIY', value: 'home'},
    {title: 'Health & Wellness', value: 'health'},
    {title: 'Gaming', value: 'gaming'},
    {title: 'Travel & Outdoors', value: 'outdoors'},
]
  const interestFilterChoicesMarkup = interests.map((interest, index) => { 
    return <Choice key={index} title={interest.title} value={interest.value} type="interest" borderColor="#5ab9ff" /> 
  })

  // filtered gift data
  const filteredGiftData = giftData
    .filter(gift => gift.interests?.some((interest) => filterState.interests.includes(interest) || filterState.interests.length === 0))
    .filter(gift => gift.occasions?.some((occasion) => filterState.occasion === occasion || filterState.occasion === ''))
    .filter(gift => gift.ageGroups?.some((ageGroup) => filterState.ageGroup === ageGroup || filterState.ageGroup === ''))

  // product cards markup
  const productCardMarkup = filteredGiftData.map((gift, index) => {
    return (
      <div key={index} className="productCard">
        <div style={{width: '100%'}}>
          <img draggable={false} src={gift.image} className="productImage" />
        </div>
        <div className="productName">{gift.name}</div>
        <div className="productDescription">{gift.description}</div>
        <Link className="checkPriceBtn" href={gift.link} target="_blank">Check Amazon Price</Link>
      </div>
    )
  })

  return (
    <div>
      <div>
        <div className="modal" style={{display: isModalOpen ? 'block' : 'none'}}>
          <IoIosCloseCircleOutline onClick={() => setIsModalOpen(false)} className="absolute right-5 text-3xl cursor-pointer" />
          <h2 className="text-center font-bold text-2xl">Filter Options</h2>
          <h3 className="font-bold mt-5">Age Group:</h3>
          <div className="flex items-start justify-center flex-wrap gap-2 mt-2">
            {ageGroupFilterChoicesMarkup}
          </div>
          <div className="mt-5">
            <h3 className="font-bold">Occasion:</h3>
            <div className="flex items-start justify-center flex-wrap gap-2 mt-2">
              {occasionFilterChoicesMarkup}
            </div>
          </div>
          <div className="mt-10">
            <h3 className="font-bold">Interests:</h3>
            <div className="flex items-start justify-center flex-wrap gap-2 mt-2">
              {interestFilterChoicesMarkup}
            </div>
          </div>
        </div>
      </div>
      <IoFilterSharp className="mobileFilterBtn cursor-pointer" onClick={() => setIsModalOpen(true)} size={35} color="#062842" />
      <div className="logoContainer">
        <img draggable={false} alt="logo" src={'/logo.png'} className="logo w-fit" />
      </div>
      <div className="filterContainer">
        <div className="flex items-center justify-center gap-4 mt-4">
          <h1 className="text-center text-4xl font-bold">Filters</h1>
          <IoFilterSharp color="white" size={40} />
        </div>
        <div className="mt-5 flex flex-col gap-7 relative">
          <div>
            <h3 className="font-bold">Age Group:</h3>
            <div className="flex items-start justify-center flex-wrap gap-2 mt-2">
              {ageGroupFilterChoicesMarkup}
            </div>
          </div>
          <div>
            <h3 className="font-bold">Occasion:</h3>
            <div className="flex items-start justify-center flex-wrap gap-2 mt-2">
              {occasionFilterChoicesMarkup}
            </div>
          </div>
          <div>
            <h3 className="font-bold">Interests:</h3>
            <div className="flex items-start justify-center flex-wrap gap-2 mt-2">
              {interestFilterChoicesMarkup}
            </div>
          </div>
        </div>
      </div>
      {filteredGiftData.length > 0 ? 
        <div className="productCardsContainer">
          {productCardMarkup}
        </div>
      :
        <div className="noMatchingGiftsMessage">Sorry, no gifts match this criteria at this time</div>
      }
    </div>
  );
}
