import { useState } from 'react';
import { Form, Field } from 'react-final-form'
import classes from './Form.module.css';

const DishesForm = () => {

    const [dishDeatils, setDishDetails] = useState([])
    const [selectedType, setSelectedType] = useState()
    const [isLoading, setIsLoading] = useState(false);

    const radios = ["pizza", "soup", "sandwich"]
    const handleClick = radio => event => setSelectedType(radio);

    const submitHandler = (event) => {
        event.preventDefault();

        setIsLoading(true);
        fetch("", {
            method: 'POST',
            body: JSON.stringify({
                name: dishDeatils.dishName,
                preparationTime: dishDeatils.preparationTime,
                type: dishDeatils.type,

            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                setIsLoading(false);
                if (res.ok) {
                    return res.json();
                } else {
                    return res.json().then((data) => {
                        let errorMessage = 'Sending data failed!';
                        throw new Error(errorMessage);
                    });
                }
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    let choosenType = ""

    if (selectedType == "pizza") {
        choosenType =
            <>
                <div className={classes.control}>
                    <label>Number of slices: </label>
                    <Field name='pizzaSlicesNumber' type='number' id="pizzaSlicesNumber" min="0" max="12" component="input" required />
                </div>
                <div className={classes.control}>
                    <label>Diameter: </label>
                    <Field name='diameterNumber' type='number' id="diameterNumber" min="0" component="input" required />
                </div>
            </>

    } else if (selectedType == "soup") {
        choosenType =
            <div className={classes.control}>
                <label>Spiceness scale: </label>
                <Field name='spicenessNumber' type='number' id="spicenessNumber" min="0" max="10" component="input" required />
            </div>
    } else if (selectedType == "sandwich") {
        choosenType =
            <div className={classes.control}>
                <label>Slices of bread: </label>
                <Field name='breadSlicesNumber' type='number' id="breadSlicesNumber" min="0" component="input" required />
            </div>
    }


    return (
        <div className={classes.background} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <section className={classes.auth}>
                <Form
                    onSubmit={submitHandler}
                    render={({ handleSubmit, values, form: { getState } }) => (
                        <form onSubmit={handleSubmit}>
                            <h1>Dishes App</h1>
                            <div className={classes.control}>
                                <label htmlFor='dishName'>Dish name</label>
                                <Field name='dishName' type='text' id="dishName" component="input" required />
                            </div>
                            <div className={classes.control}>
                                <label htmlFor='preparationTime'>Preparation time</label>
                                <Field step="2" name='preparationTime' type='time' id="preparationTime" component="input" required />
                            </div>
                            <div className={classes.control}>
                                <div className={classes.radio}>
                                    <label style={{ marginRight: "15px" }} htmlFor='dishType'>Type of dish</label>
                                    {radios.map(radioType => {
                                        return (
                                            <label key={radioType}>
                                                <Field
                                                    name="type"
                                                    component="input"
                                                    type="radio"
                                                    value={radioType}
                                                    onClick={handleClick(radioType)}
                                                />{' '}
                                                {radioType}
                                            </label>
                                        )
                                    })}
                                </div>
                            </div>
                            {choosenType}
                            <div className={classes.actions}>
                                {!isLoading && (
                                    <button onClick={() => setDishDetails(getState().values)} type='button'
                                        className={classes.toggle}>Submit</button>
                                )}
                                {isLoading && <p>Sending request...</p>}
                            </div>
                            <pre>{JSON.stringify(values, 0, 2)}</pre>

                        </form>
                    )}
                />
            </section>
        </div>

    );
};

export default DishesForm;