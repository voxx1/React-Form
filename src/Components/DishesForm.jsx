import { useState, useRef } from 'react';
import { Form, Field } from 'react-final-form'
import classes from './Form.module.css';

const DishesForm = () => {

    const dishNameInputRef = useRef();
    const preparationTimeInputRef = useRef();
    const typeInputRef = useRef();


    const [isLoading, setIsLoading] = useState(false);


    const submitHandler = (event) => {
        event.preventDefault();

        const enteredDishName = dishNameInputRef.current.value;
        const enteredPreparationTime = preparationTimeInputRef.current.value;
        const enteredType = typeInputRef.current.value

        setIsLoading(true);
        let url;
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                name: enteredDishName,
                preparationTime: enteredPreparationTime,
                type: enteredType,
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
                        let errorMessage = 'Authentication failed!';

                        throw new Error(errorMessage);
                    });
                }
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    return (
        <div className={classes.background} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <section className={classes.auth}>
                <Form
                    onSubmit={submitHandler}
                    render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <h1>Dishes App</h1>
                            <div className={classes.control}>
                                <label htmlFor='dishName'>Dish name</label>
                                <Field name='dishName' type='text' id="dishName" component="input" required ref={dishNameInputRef} />
                            </div>
                            <div className={classes.control}>
                                <label htmlFor='preparationTime'>Preparation time</label>
                                <Field step="2" name='preparationTime' type='time' id="preparationTime" component="input" required ref={preparationTimeInputRef} />
                            </div>
                            <div className={classes.control}>
                                <div className={classes.radio}>
                                    <label style={{ marginRight: "15px" }} htmlFor='dishType'>Type of dish</label>
                                    <label>
                                        <Field
                                            name="stooge"
                                            component="input"
                                            type="radio"
                                            value="pizza"
                                        />{' '}
                                        Pizza
                                    </label>
                                    <label>
                                        <Field
                                            name="stooge"
                                            component="input"
                                            type="radio"
                                            value="soup"
                                        />{' '}
                                        Soup
                                    </label>
                                    <label>
                                        <Field
                                            name="stooge"
                                            component="input"
                                            type="radio"
                                            value="sandwich"
                                        />{' '}
                                        Sandwich
                                    </label>
                                </div>
                            </div>
                            <div className={classes.actions}>
                                {!isLoading && (
                                    <button type='button'
                                        className={classes.toggle}>Submit</button>
                                )}
                                {isLoading && <p>Sending request...</p>}
                            </div>
                        </form>
                    )}
                />
            </section>
        </div>

    );
};

export default DishesForm;