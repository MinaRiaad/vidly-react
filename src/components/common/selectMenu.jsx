import React from 'react';

const SelectMenu = ({options,name,label,error,...rest}) => {
    return (
      <div className="form-group">
        {console.log({...rest})};
        <label htmlFor={name}>{label}</label>
        <select class="form-control" id={name} name={name} {...rest}>
          <option></option>
          {options.map(item => {
            return (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            );
          })}
        </select>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
}
 
export default SelectMenu;