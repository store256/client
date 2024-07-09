import React, { useState, useEffect } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import "./select.css";
import { Link } from "react-router-dom";

const Select = ({ data = [], placeholder, icon, link }) => {
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(placeholder); // Default value
  const [listData, setListData] = useState(data);
  const [listData2, setListData2] = useState(data);

  useEffect(() => {
    setListData(data);
    setListData2(data);
  }, [data]);

  const openSelect = () => {
    setIsOpenSelect(!isOpenSelect);
  };

  const closeSelect = (index, name) => {
    setSelectedIndex(index);
    setIsOpenSelect(false);
    setSelectedItem(name);
  };

  const filterList = (e) => {
    const keyword = e.target.value.toLowerCase();
    const list = listData2.filter((item) => item.toLowerCase().includes(keyword));
    setListData(list);
  };

  return (
    <ClickAwayListener onClickAway={() => setIsOpenSelect(false)}>
      <div className="selectDrop cursor position-relative" onClick={openSelect}>
        {icon}
        <span className="openSelect">
          {selectedItem.length > 14 ? `${selectedItem.substr(0, 14)}...` : selectedItem}
          <KeyboardArrowDownIcon fontSize="small" className="arrow" />
        </span>

        {isOpenSelect && (
          <div className="selectDropdown" onClick={(e) => e.stopPropagation()}>
            <div className="searchField">
              <input type="text" placeholder="Search here..." onChange={filterList} />
            </div>
            <ul className="searchResult">
              <li key={0} onClick={() => closeSelect(0, placeholder)} className={`${selectedIndex === 0 ? 'active' : ''}`}>
                {placeholder}
              </li>
              {Array.isArray(listData) && listData.map((item, index) => (
               
                <li key={index + 1} onClick={() => closeSelect(index + 1, item)} className={`${selectedIndex === index + 1 ? 'active' : ''}`}>
                {item}
                </li>
                
              ))}
            </ul>
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default Select;
