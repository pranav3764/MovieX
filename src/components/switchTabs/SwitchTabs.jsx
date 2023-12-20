import React from 'react'
import "./style.scss"
import { useState } from 'react'

function SwitchTabs({ data, onTabChange }) {
    const [selectedTab, setSelectedTab] = useState(0);
    const [left, setLeft] = useState(0);
    const activeTab = (tab, index) => {
        setLeft(index * 100);
        setTimeout(() => {
            setSelectedTab(index)
        }, 400);
        onTabChange(tab, index);
    }
  return (
    <div className="switch-tabs">
        <div className="tab-items">
            {data.map((tab, index) => (
                <span key={index} className={`tab-item ${selectedTab === index ? 'active' : ""}`} onClick={() => {activeTab(tab, index)}}>
                    {tab}
                </span>
            ))}
            <span className="moving-bg" style={{ left: left }}></span>
        </div>
    </div>
  )
}

export default SwitchTabs