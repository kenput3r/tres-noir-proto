import React, { useContext, useState, useEffect } from 'react'
import { Link } from "gatsby"
import styled from "styled-components"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import { CustomerContext } from "../../context/customerContext"
import { CustomerInfo } from "../../types/"
import AccountPageSkeleton from "../../components/skeletons/accountPage"
import { validateEmail, validatePhone, validatePassword, formatPhone } from "../../utils/formValidation"

const Page = styled.div`
  input {
    display: block;

    &.error {
      border-color: red;
    }
  }
  input[type="checkbox"] {
    display: inline-block
  }
`

const Register = () => {
  const { createCustomer } = useContext(CustomerContext)
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [acceptsMarketing, setAcceptsMarketing] = useState(true)
  const [isValidEmail, setIsValidEmail] = useState(false)
  const [isValidPhone, setIsValidPhone] = useState(false)
  const [isValidPassword, setIsValidPassword] = useState(false)
  const [isValidForm, setIsValidForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState(null)

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const formatted_phone = formatPhone(phone)
    const info: CustomerInfo = { 
      email, 
      password,
      acceptsMarketing,
      ...firstName && { firstName },
      ...lastName && { lastName },
      ...phone && isValidPhone && { formatted_phone }
    }
    console.log(info)
    const response = await createCustomer(info)
    console.log(response)
  }

  /**
   * Validate email and password field,
   * disable submit if invalid
   */
  useEffect(() => {
    const isValidPhone = validatePhone(phone)
    const isValidEmail = validateEmail(email)
    const isValidPassword = validatePassword(password)
    setIsValidPhone(isValidPhone)
    setIsValidEmail(isValidEmail)
    setIsValidPassword(isValidPassword)
    if (isValidEmail && isValidPassword && (isValidPhone || !phone.length)) {
      setIsValidForm(true)
    } else {
      setIsValidForm(false)
    }
  }, [email, password, phone])

  return (
    <Layout>
      <SEO title="Register for an account" />
      <Page>
        {!isSubmitting ? (
          <div className="content">
            <h1>Register for a new account</h1>
            {errors && (
              <div className="errors">
                errors go here
              </div>
            )}
            <form>
              <input type="email" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} aria-label="Email Address" placeholder="Email" className={!isValidEmail && email.length ? "error" : ""} />

              <input type="text" id="firstName" name="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} aria-label="First Name" placeholder="First Name" />

              <input type="text" id="lastName" name="lastName" value={lastName} onChange={e => setLastName(e.target.value)} aria-label="Last Name" placeholder="Last Name" />

              <input type="tel" id="phone" name="phone" value={phone} onChange={e => setPhone(e.target.value)} aria-label="Phone Number" placeholder="Phone Number" className={phone.length && !isValidPhone ? "error" : ""} />

              <input type="checkbox" id="acceptsMarketing"  name="acceptsMarketing" checked={acceptsMarketing} onChange={e => setAcceptsMarketing(!acceptsMarketing)} />

              <label htmlFor="acceptsMarketing">Receive Newsletters</label>
              <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} aria-label="Password" placeholder="Password" className={!isValidPassword && password.length ? "error" : ""} />

              {isValidForm ? (
                <button onClick={e => handleSubmit(e)}>Create Account</button>
              ) : (
                <button disabled={true} onClick={e => handleSubmit(e)}>Create Account</button>
              )}
            </form>
          </div>
        ) : (
          <AccountPageSkeleton />
        )}
      </Page>
    </Layout>
  )
}

export default Register
