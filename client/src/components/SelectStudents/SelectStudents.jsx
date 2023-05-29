import './SelectStudents.scss'
import { GoCheck } from 'react-icons/go'
import { forwardRef, useState, useImperativeHandle, useEffect } from "react";

const SelectStudents = forwardRef(({ options, onSelect, students, emptyFields}, ref) => {
    const [isCheckedAll, setIsCheckedAll] = useState(false);
    const [checkedItems, setCheckedItems] = useState([]);

    useImperativeHandle(ref, () => ({

      updateChildState() {
        setIsCheckedAll(false);
        setCheckedItems([]);
      }
    }));

    useEffect(() => {
      if(students){
        const initialCheckedItems = {};
    
        options.forEach((option) => {
          const groupName = option.group;
          const groupStudents = option.students.map((student) => student.email);
          const intersectedStudents = groupStudents.filter((student) =>
            students.includes(student)
          );
      
          initialCheckedItems[groupName] = intersectedStudents;
      
          if (intersectedStudents.length === groupStudents.length) {
            setIsCheckedAll((prev) => ({ ...prev, [groupName]: true }));
          }
        });
      
        setCheckedItems(initialCheckedItems);
        onSelect(initialCheckedItems)
      }
    }, [options, students]);

    // Handle if checked all values in group 
    const handleSelectAll = (event) => {
      const isChecked = event.target.checked;
      const groupName = event.target.getAttribute('data-group');
  
      setIsCheckedAll((prev) => ({ ...prev, [groupName]: isChecked }));
  
      if (isChecked) {
        const checkObject = (prev) => ({
          ...prev,
          [groupName]: options.find((option) => option.group === groupName).students.map((student) => student.email)
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
      <div className={`checkbox-group ${emptyFields.includes('students') ? 'error' : ''}`}>
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
              <div className='checkbox-group__item' key={student.email}>
                <label className={`checkbox-group__label ${groupCheckedItems.includes(student.email) ? 'checked': ''}`}>
                  <input
                    className='checkbox-group__input'
                    type="checkbox"
                    value={student.email}
                    checked={groupCheckedItems.includes(student.email)}
                    data-group={groupName}
                    onChange={handleSelect}
                  />
                  <span className='checkbox-group__icon'>{groupCheckedItems.includes(student.email) && <GoCheck size={11}/>}</span>
                  <span className='checkbox-group__student'>{student.fullname}</span>
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