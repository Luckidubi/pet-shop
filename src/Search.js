import React, { useState, useEffect } from 'react';
import pet, { ANIMALS } from "@frontendmasters/pet";
import Results from "./Results";

const Search = () => {
    const [location, setLocation] = useState("Seattle, WA");
    const [animal, setAnimal] = useState("Dog");
    const [breed, setBreed] = useState("");
    const [breeds, setBreeds] = useState([]);
    const [pets, setPets] = useState([]);

    async function requestPets() {
        const { animals } = await pet.animals({
            location,
            breed,
            type: animal
        });

        setPets(animals || []);
    }

    useEffect(() => {
        setBreeds([]);
        setBreed("");

        pet.breeds(animal).then(({ breeds }) => {
            const breedItems = breeds.map(({ name }) => name);
            setBreeds(breedItems);
        }, console.error);

    }, [animal, setBreed, setBreeds])

    return (
        <div className="search-params">
            <form onSubmit={e => {
                e.preventDefault();
                requestPets();
            }}>
                <label htmlFor="location">
                    Location
                    <input id="location" value={location}
                        placeholder="Location"
                        onChange={(e) => setLocation(e.target.value)} />
                </label>
                <label htmlFor="animal">
                    Animal
                <select id="animal"
                        value={animal}
                        onChange={e => setAnimal(e.target.value)}
                        onBlur={e => setAnimal(e.target.value)} >
                        <option>All</option>
                        {ANIMALS.map(animal => (
                            <option key={animal} value={animal} >
                                {animal}
                            </option>
                        ))}
                    </select>
                </label>

                <label htmlFor="breed">Breed
                    <select id="breed"
                        value={breed}
                        onChange={e => setBreed(e.target.value)}
                        onBlur={e => setBreed(e.target.value)}
                        disabled={!breeds.length}>
                        <option>All</option>
                        {breeds.map(breedItem => (
                            <option value={breedItem}>{breedItem}
                            </option>))
                        }

                    </select>
                </label>

                <button>Submit</button>
            </form>

            <Results pets={pets} />

        </div >
    )
}

export default Search;