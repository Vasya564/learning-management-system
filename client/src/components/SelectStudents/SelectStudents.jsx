import './SelectStudents.scss'
import { GoCheck } from 'react-icons/go'
import { forwardRef, useState, useImperativeHandle } from "react";

const SelectStudents = forwardRef(({ options, onSelect}, ref) => {
    const [isCheckedAll, setIsCheckedAll] = useState(false);
    const [checkedItems, setCheckedItems] = useState([]);

    useImperativeHandle(ref, () => ({

      updateChildState() {
        setIsCheckedAll(false);
        setCheckedItems([]);
      }
    }));

    // Handle if checked all values in group 
    const handleSelectAll = (event) => {
      const isChecked = event.target.checked;
      const groupName = event.target.getAttribute('data-group');
  
      setIsCheckedAll((prev) => ({ ...prev, [groupName]: isChecked }));
  
      if (isChecked) {
        const checkObject = (prev) => ({
          ...prev,
          [groupName]: options.find((option) => option.group === groupName).students
        })
        setCheckedItems(checkObject);
        onSelect(checkObject)
      } else {
        const uncheckObject = (prev) => ({ ...prev, [groupName]: [] });
        setCheckedItems(uncheckObject);
        onSelect(uncheckObject)
      }
    };
  
    // Handle single checked values
    const handleSelect = (event) => {
      const isChecked = event.target.checked;
      const value = event.target.value;
      const groupName = event.target.getAttribute('data-group');
    
      const newItems = { ...checkedItems };
      if (!newItems[groupName]) {
        newItems[groupName] = [];
      }
    
      if (isChecked) {
        newItems[groupName].push(value);
      } else {
        newItems[groupName] = newItems[groupName].filter((item) => item !== value);
      }
    
      const isGroupCheckedAll = options.find((option) => option.group === groupName).students.length === newItems[groupName].length;
      setIsCheckedAll((prev) => ({ ...prev, [groupName]: isGroupCheckedAll }));
    
      setCheckedItems(newItems);
      onSelect(newItems);
    };
  
    return (
      <div className='checkbox-group'>
      {options.map((option) => {
        
      const groupName = option.group;
      const groupCheckedItems = checkedItems[groupName] || [];
      const isGroupCheckedAll = isCheckedAll[groupName] || false;

        return (
          <div className='checkbox-group__title' key={option.group}>
            <label className={`checkbox-group__label--all ${isGroupCheckedAll ? 'checked' : ''}`}>
              <input
                className='checkbox-group__input--all' 
                type="checkbox" 
                checked={isGroupCheckedAll}
                data-group={groupName} 
                onChange={handleSelectAll} 
                />
              <span className='checkbox-group__icon'>{isGroupCheckedAll && <GoCheck size={11}/>}</span>
              <span className='checkbox-group__group'>{option.group}</span>
            </label>
          {option.students.map((student) => {
            return (
              <div className='checkbox-group__item' key={student}>
                <label className={`checkbox-group__label ${groupCheckedItems.includes(student) ? 'checked': ''}`}>
                  <input
                    className='checkbox-group__input'
                    type="checkbox"
                    value={student}
                    checked={groupCheckedItems.includes(student)}
                    data-group={groupName}
                    onChange={handleSelect}
                  />
                  <span className='checkbox-group__icon'>{groupCheckedItems.includes(student) && <GoCheck size={11}/>}</span>
                  <span className='checkbox-group__student'>{student}</span>
                </label>
              </div>
              )
            })}
          </div>
        );
      })}
      </div>
    );
})
 
export default SelectStudents;