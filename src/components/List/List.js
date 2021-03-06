import React from 'react';
import './List.css';
import { Link } from 'react-router-dom';

const List = (props) => {
  const listItem = (task) => {
    return (
      <div className='list__item' key={task._id}>
        <div className='list__content'>
          <h3 className='list__item__heading'>{task.description}</h3>
          {task.body && (
            <p className='list__item__body'>
              Duis autem vel eum iriure dolor in hendrerit in vulputate velit
              esse molestie consequat, vel illum dolore eu feugiat nulla
              facilisis.
            </p>
          )}
          <div className='list__item__meta'>
            <div className='item__widget'>
              <div className='list__item__meta__img'>
                <img
                  src={`https://kumar-task-manager-api.herokuapp.com/users/${task.owner}/avatar/`}
                  alt='task owner pic'
                />
              </div>
              <div className='list__item__meta__detail'>
                <h5>Created</h5>
                <p>{task.createdAt.slice(0, 10)}</p>
              </div>
            </div>
            <div className='item__widget'>
              <div className='list__item__meta__img'>
                <img src='/img/profile-pic.jpg' alt='task assignee pic' />
              </div>
              <div className='list__item__meta__detail'>
                <h5>Assigned</h5>
                <p>{task.updatedAt.slice(0, 10)}</p>
              </div>
            </div>
            <div className='item__widget'>
              <div className='list__item__meta__img'>
                <img src='/img/profile-pic.jpg' alt='task assignee pic' />
              </div>
              <div className='list__item__meta__detail'>
                <h5>{task.completed ? 'Completed' : 'Due'}</h5>
                <p>
                  {task.completed ? task.updatedAt.slice(0, 10) : `2020-06-02`}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='list__image'>
          <img src='/img/philly.jpg' alt='Task pic' />
          <Link
            to={`/tasks/edit/${task._id}`}
            className='btn btn__list btn__list--edit'
          >
            Edit
          </Link>
          <Link
            to={`/tasks/delete/${task._id}`}
            className='btn btn__list btn__list--delete'
          >
            Delete
          </Link>
        </div>
      </div>
    );
  };
  const renderList = (itemArray) => {
    if (!(itemArray.length > 0)) {
      // this.props.user.id &&
      return <div>Loading...</div>;
    } else {
      return itemArray.map((item) => {
        return listItem(item);
      });
    }
  };
  return (
    <div className='list'>
      <form className='search__box'>
        <input type='text' className='search' />
        <button>Search</button>
      </form>
      <div className='list__header'>
        <h2 className='list__name'>Tasks</h2>
        <Link to={`/tasks/new`} className='btn cta btn--orange'>
          Add New
        </Link>
      </div>
      <div className='filter__area'>
        <div className='searchCount'>
          <label>Total Count: </label>
          {props.tasks.length}
        </div>
        <div className='filters'>
          {props.filter.label.map((filterName, index) => (
            <div className='filter' key={index}>
              <label htmlFor='filter' className='filter__label'>
                {props.filter.label[index]}
              </label>
              <select
                className='filter__type'
                id='filter'
                onChange={(event) => {
                  props.filter.onChange[index](event.target.value);
                }}
              >
                {props.filter.options[filterName].map((option, index) => (
                  <option
                    key={index}
                    value={props.filter.values[filterName][index]}
                  >
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>
      {renderList(props.tasks)}
    </div>
  );
};

export default List;
