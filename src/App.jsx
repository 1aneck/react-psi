import { useState } from "react"
import "./App.css"
import rawData from "./data.json"
import DogList from "./components/DogList"
import DogForm from "./components/DogForm"

function App() {
  const [listOfDogs, setListOfDogs] = useState(rawData.dogs)
  const [activeTab, setActiveTab] = useState(1)
  const [shelterStorage, setShleterStorage] = useState({
    food: 35,
    vaccine: 15,
    pills: 20,
  })
  const dogRequirements = {
    food: 5,
    vaccine: 1,
    pills: 2,
  }
  const [tempStorage, setTempStorage] = useState({
    food: "",
    vaccine: "",
    pills: "",
  })

  const handleDelete = (idToDel) => {
    const temp = listOfDogs.filter((dog) => dog.id !== idToDel)
    setListOfDogs(temp)
  }

  const handleAdd = (newDog) => {
    const requirements = {
      food: dogRequirements.food * (listOfDogs.length + 1),
      vaccine: dogRequirements.vaccine * (listOfDogs.length + 1),
      pills: dogRequirements.pills * (listOfDogs.length + 1),
    }
    if (
      requirements.food <= shelterStorage.food &&
      requirements.vaccine <= shelterStorage.vaccine &&
      requirements.pills <= shelterStorage.pills
    ) {
      setListOfDogs([...listOfDogs, newDog])
    } else {
      alert("Smůla!")
    }
  }

  const handleStorage = (e) => {
    const source = e.target.name
    switch (source) {
      case "food": {
        setTempStorage({ ...tempStorage, food: e.target.value })
        break
      }
      case "vaccine": {
        setTempStorage({ ...tempStorage, vaccine: e.target.value })
        break
      }
      case "pills": {
        setTempStorage({ ...tempStorage, pills: e.target.value })
        break
      }
      default:
        break
    }
  }

  const handleAddToStorage = () => {
    const temp = {
      food: tempStorage.food === "" ? 0 : parseInt(tempStorage.food),
      vaccine: tempStorage.vaccine === "" ? 0 : parseInt(tempStorage.vaccine),
      pills: tempStorage.pills === "" ? 0 : parseInt(tempStorage.pills),
    }
    setShleterStorage({
      food: temp.food + shelterStorage.food,
      vaccine: temp.vaccine + shelterStorage.vaccine,
      pills: temp.pills + shelterStorage.pills,
    })
    setTempStorage({
      food: "",
      vaccine: "",
      pills: "",
    })
  }

  return (
    <div className="page-container">
      <div className="page-toggler">
        <button
          className={`toggler-btn ${activeTab === 1 ? "active" : ""}`}
          name="list-of-dogs"
          onClick={() => setActiveTab(1)}
        >
          Seznam psů
        </button>
        <button
          className={`toggler-btn ${activeTab === 2 ? "active" : ""}`}
          name="shelter-storage"
          onClick={() => setActiveTab(2)}
        >
          Sklad útulku
        </button>
      </div>
      {activeTab === 1 && (
        <>
          <DogList data={listOfDogs} onDelete={handleDelete} />
          <DogForm data={listOfDogs} onAdd={handleAdd} />
        </>
      )}
      {activeTab === 2 && (
        <>
          <h3>Skladové hospodářství</h3>
          <p>granule: {shelterStorage.food} kg</p>
          <p>vakcíny: {shelterStorage.vaccine} kg</p>
          <p>medikamenty: {shelterStorage.pills} kg</p>
          <div className="shelter-form">
            <input
              type="number"
              name="food"
              id="food"
              value={tempStorage.food}
              min={0}
              onChange={handleStorage}
              placeholder="granule (kg)"
            />
            <input
              type="number"
              name="vaccine"
              id="vaccine"
              value={tempStorage.vaccine}
              min={0}
              onChange={handleStorage}
              placeholder="vakcíny (ks)"
            />
            <input
              type="number"
              name="pills"
              id="pills"
              value={tempStorage.pills}
              min={0}
              onChange={handleStorage}
              placeholder="medikamenty (ks)"
            />
            <button onClick={handleAddToStorage}>Doplň zásoby</button>
          </div>
        </>
      )}
    </div>
  )
}

export default App
