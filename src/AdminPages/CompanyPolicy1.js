import React, { useState, useEffect ,useCallback} from 'react';
import {
  Card,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import AddPolicy from "./core/AddPolicy";
const FixedHeightCard = ({
  title,
  content,
  onClickReadMore,
  isExpanded,
  onMenuClick,
  onEditClick,
  onDeleteClick
}) => {
  const shortenedDescription = content.split(' ').slice(0, 37).join(' ');

  return (
    <Card style={{ padding: '20px', overflow: 'hidden' }}>
      <div className='mt-3'>
        <h4>{title}</h4>
      </div>
      <div className='text-secondary' style={{ minHeight: '150px', overflow: 'hidden' }}>
        <p className='m-3'>{isExpanded ? content : shortenedDescription}...</p>
      </div>
      <Button
        variant="contained"
        style={{
          fontWeight: 600,
          fontSize: '15px',
          color: 'white',
          background: '#1B1A47',
          borderRadius: '30px',
          marginTop: '12px',
        }}
        onClick={onClickReadMore}
      >
        <Link to='/policy1' className='text-decoration-none text-white'>
          {isExpanded ? 'Read Less' : 'Read More'}
        </Link>
      </Button>
      <IconButton
        aria-haspopup="true"
        onClick={onMenuClick}
        style={{ position: 'absolute', top: '10px', right: '10px' }}
      >
        <MoreVertIcon />
      </IconButton>
      {/* Menu and Dialog components can be rendered here as well if you want them inside the card */}
    </Card>
  );
};

const CompanyPolicy = () => {
  const navigate = useNavigate();
  const [cardsData, setCardsData] = useState([]);
  const [expandedCards, setExpandedCards] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [itemId, setItemId] = useState(null);
  const [Edittitle, setEdittitle] = useState("");
  const handletitle = (e) => {
    setEdittitle(e.target.value);
  };

  const [EditContent, setEditcontent] = useState("");
  const handleContent = (e) => {
    setEditcontent(e.target.value);
  };

  const [editData, setEditData] = useState({
    id: null,
    title: "",
    content: "",
  });
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    fetchData();
  },[]);
  const fetchData=()=>{
    axios
      .get('http://localhost:8080/bytesfarms/policy/get?id=0')
      .then((response) => {
        setCardsData(response.data);
        // Initialize the expanded state for each card to false
        setExpandedCards(Array(response.data.length).fill(false));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleReadMoreClick = (index) => {
    // Get the selected card's data
    const selectedCard = cardsData[index];

    // Toggle the expanded state for the clicked card
    setExpandedCards((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });

    // Redirect to the Policy component with the selected card's title and content
    navigate('/policy1', {
      state: {
        title: selectedCard.title,
        content: selectedCard.content,
      },
    });
  };

  const handleMenuClick = (event, itemId) => {
    setAnchorEl(event.currentTarget);
    setSelectedItemId(itemId);

    const selectedItem = cardsData.find((item) => item.id === itemId);

    if (selectedItem) {
      setEditData({
        id: selectedItem.id,
        title: selectedItem.title,
        content: selectedItem.content,
      });

      setEdittitle(selectedItem.title);
      setEditcontent(selectedItem.content);

      setOpen(true);
    } else {
      console.error("Item not found for editing.");
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItemId(null);
    };

    const handleEditClick = useCallback(
      (itemId) => () => {
        setSelectedItemId(itemId);
        setOpen(true);
      },
      [handleMenuClose]
    );

  const handleDeleteClick = () => {
    if (!selectedItemId) {
      console.error("No item selected for deletion.");
      handleMenuClose();
      return;
    }

    const apiUrl = `http://localhost:8080/bytesfarms/policy/delete?id=${selectedItemId}`;

    axios
      .delete(apiUrl)
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.error("Error deleting item:", error.message);
      })
      .finally(() => {
        handleMenuClose();
      });
  };

  const handleClose = () => {
    setOpen(false);
    setEditData({
      id: null,
      title: "",
      content: "",
    });
  };


  const handleEditApiCall = () => {
    const editData = {
      title: Edittitle,
      content: EditContent,
    };

    axios
      .put(
        `http://localhost:8080/bytesfarms/policy/update?id=${selectedItemId}`,
        editData
      )
      .then((response) => {
        fetchData();
      })
      .catch((error) => {
        console.error("Error editing item:", error.message);
      })
      .finally(() => {
        handleMenuClose();
        handleClose();
      });
  };
  const handlePolicyAdded = (newPolicy) => {
    setCardsData((prevData) => [...prevData, newPolicy]);
    fetchData();
  };

  return (
    <>
    <Sidebar/>
      <main style={{ backgroundColor: '#F0F5FD' }}>
        <div className='p-5'>
          <div className='d-flex justify-content-between'>          
            <h3 className='pb-3'>Company Policy</h3>
            <div><AddPolicy onPolicyAdded={handlePolicyAdded} /></div>
          </div>

          <div className='container'>
            <div className='row'>
              {cardsData.map((card, index) => (
                <div key={card.id} className='col-md-4 p-2'>
                  <FixedHeightCard
                    title={card.title}
                    content={card.content}
                    onClickReadMore={() => handleReadMoreClick(index)}
                    isExpanded={expandedCards[index]}
                    onMenuClick={(e) => handleMenuClick(e, card.id)}
                    onEditClick={handleEditClick(card.id)}
                    onDeleteClick={handleDeleteClick}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditClick(itemId)}>
          Edit
        </MenuItem>
        <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
      </Menu>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle
          style={{ fontSize: '30px', fontWeight: '600' }}
        >
          Update
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            name="name"
            value={Edittitle}
            onChange={handletitle}
          />
          <TextField
            autoFocus
            margin="dense"
            id="number"
            label="Content"
            multiline
            rows={8} // Set the number of rows based on your content length
            fullWidth
            variant="standard"
            name="name"
            value={EditContent}
            onChange={handleContent}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            className="text-white"
            style={{ backgroundColor: "#1B1A47" }}
          >
            Cancel
          </Button>
          <Button
            className="text-white"
            style={{ backgroundColor: "#1B1A47" }}
            onClick={handleEditApiCall}
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CompanyPolicy;
