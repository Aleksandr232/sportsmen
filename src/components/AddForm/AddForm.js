

import {useHttp} from '../../hooks/http.hook';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { sportsmenCreated } from '../../actions';

const AddForm = () => {
    
    const [sportsmenName, setSportsmenName] = useState('');
    const [sportsmenDescr, setSportsmenDescr] = useState('');
    const [sportsmenElement, setSportsmenElement] = useState('');

    const {filters, filtersLoadingStatus} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        
        const newHero = {
            id: uuidv4(),
            name: sportsmenName,
            description: sportsmenDescr,
            element: sportsmenElement
        }

      
        request("http://localhost:3001/sportsmen", "POST", JSON.stringify(newHero))
            .then(res => console.log(res, 'Отправка успешна'))
            .then(dispatch(sportsmenCreated(newHero)))
            .catch(err => console.log(err));

      
        setSportsmenName('');
        setSportsmenDescr('');
        setSportsmenElement('');
    }

    const renderFilters = (filters, status) => {
        if (status === "loading") {
            return <option>Загрузка элементов</option>
        } else if (status === "error") {
            return <option>Ошибка загрузки</option>
        }
        
      
        if (filters && filters.length > 0 ) {
            return filters.map(({name, label}) => {
                
                if (name === 'all')  return;

                return <option key={name} value={name}>{label}</option>
            })
        }
    }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Ваше имя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    value={sportsmenName}
                    onChange={(e) => setSportsmenName(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    value={sportsmenDescr}
                    onChange={(e) => setSportsmenDescr(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать вид спорта</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={sportsmenElement}
                    onChange={(e) => setSportsmenElement(e.target.value)}>
                    <option value="">Я занимаюсь...</option>
                    {renderFilters(filters, filtersLoadingStatus)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default AddForm;