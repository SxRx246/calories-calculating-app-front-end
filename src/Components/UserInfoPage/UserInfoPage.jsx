import React from 'react'
import { useEffect, useState } from 'react'
import { getUserInfoDetails } from '../../services/userInfoService'

const activityMultipliers = {
    sedentary: 1.2,
    lightly_active: 1.375,
    moderately_active: 1.55,
    very_active: 1.725,
    super_active: 1.9
}


const UserInfoPage = () => {
    return (
        <div>
            <h1>User Info Summary</h1>
            <p><strong>Age:</strong> {userInfo.age}</p>
            <p><strong>Gender:</strong> {userInfo.gender}</p>
            <p><strong>Height:</strong> {userInfo.height.value} {userInfo.height.unit}</p>
            <p><strong>Weight:</strong> {userInfo.weight.value} {userInfo.weight.unit}</p>
            <p><strong>Activity Level:</strong> {userInfo.activityLevel}</p>
        </div>
    )
}

export default UserInfoPage
