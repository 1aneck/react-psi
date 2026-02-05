import React, { useEffect, useState } from "react"
import "./DogForm.css"

function DogForm({ data, onAdd }) {
  const [valid, setValid] = useState(false)

  const [newDog, setNewDog] = useState({
    id: data.length > 0 ? Math.max(...data.map((item) => item.id)) + 1 : 1,
    name: "",
    breed: "",
    age: "",
  })

  const validateData = (dog) => {
    if (dog.age === "" || dog.age > 25 || dog.age < 0) {
      setValid(false)
    } else if (dog.name === "") {
      setValid(false)
    } else if (dog.breed === "") {
      setValid(false)
    } else {
      setValid(true)
    }
  }

  useEffect(() => {
    validateData(newDog)
  }, [newDog])

  const resetNewDog = () => {
    const temp = {
      id: newDog.id + 1,
      name: "",
      breed: "",
      age: "",
    }
    setNewDog(temp)
    // validateData(temp)
  }

  const handleChange = (e) => {
    const source = e.target.name
    const val = e.target.value

    let updatedDog

    switch (source) {
      case "name": {
        updatedDog = { ...newDog, name: val }
        break
      }
      case "breed": {
        updatedDog = { ...newDog, breed: val }
        break
      }
      case "age": {
        updatedDog = { ...newDog, age: val }
        break
      }
      default:
        break
    }
    setNewDog(updatedDog)
    // validateData(updatedDog)
  }

  return (
    <div className="dog-form">
      <input
        type="text"
        name="name"
        id="name"
        placeholder="jméno psa"
        value={newDog.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="breed"
        id="breed"
        placeholder="rasa psa"
        value={newDog.breed}
        onChange={handleChange}
      />
      <input
        type="number"
        name="age"
        id="age"
        min="0"
        max="25"
        placeholder="věk"
        value={newDog.age}
        onChange={handleChange}
      />
      <button
        onClick={() => {
          onAdd(newDog)
          resetNewDog()
        }}
        disabled={!valid}
      >
        Přidat
      </button>
    </div>
  )
}

export default DogForm
