import React from 'react'
import ContentLoader from "react-content-loader"

const AccountPageSkeleton = (props) => {
  return (
    <ContentLoader 
    speed={2}
    width={640}
    height={350}
    viewBox="0 0 640 350"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="48" y="8" rx="3" ry="3" width="88" height="6" /> 
    <rect x="48" y="26" rx="3" ry="3" width="52" height="6" /> 
    <rect x="9" y="54" rx="3" ry="3" width="554" height="8" /> 
    <rect x="9" y="67" rx="3" ry="3" width="559" height="9" /> 
    <rect x="8" y="84" rx="3" ry="3" width="545" height="9" /> 
    <circle cx="20" cy="20" r="20" /> 
    <rect x="11" y="106" rx="0" ry="0" width="554" height="105" /> 
    <rect x="9" y="231" rx="0" ry="0" width="550" height="12" /> 
    <rect x="8" y="267" rx="0" ry="0" width="553" height="15" /> 
    <rect x="8" y="297" rx="0" ry="0" width="549" height="13" />
  </ContentLoader>
  )
}

export default AccountPageSkeleton
