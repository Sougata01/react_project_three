import React, { useState, useRef } from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css"
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

const AddUser = props => {
    const [enteredName, setEnteredName] = useState('')
    const [enteredAge, setEnteredAge] = useState('')
    const [error, setError] = useState()
    const collegeNameInputRef = useRef()

    const addUserHandler = (event) => {
        event.preventDefault()
        if (enteredName.trim().length === 0 || enteredAge.trim().length === 0) {
            setError({
                title: 'Invalid input',
                message: 'Please enter a valid name and age (non-empty values).'
            })
            return
        }
        if (+enteredAge < 1) {
            setError({
                title: 'Invalid input',
                message: 'Please enter a valid age (> 0).'
            })
            return
        }
        props.onAddUser(enteredName, enteredAge, collegeNameInputRef.current.value)
        setEnteredName('')
        setEnteredAge('')
        collegeNameInputRef.current.value = ''
    }

    const nameChangeHandler = (event) => {
        setEnteredName(event.target.value)
    }

    const ageChangeHandler = (event) => {
        setEnteredAge(event.target.value)
    }

    const errorHandler = () => {
        setError(null)
    }

    return (
        <div>
            {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}
            <Card className={classes.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" value={enteredName} onChange={nameChangeHandler}></input>
                    <label htmlFor="age">Age (Years)</label>
                    <input id="age" type="number" value={enteredAge} onChange={ageChangeHandler}></input>
                    <label htmlFor="collegename">College name</label>
                    <input id="collegename" type="text" ref={collegeNameInputRef}></input>
                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </div>
    )
}

export default AddUser