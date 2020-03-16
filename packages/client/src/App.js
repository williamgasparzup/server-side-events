import React, { useState, useEffect } from 'react';
import {
  IconButton,
  Badge,
  Popover,
  ListItem,
  ListItemText,
  List,
  Avatar
} from '@material-ui/core'
import { Notifications, Person } from '@material-ui/icons'
import { formatDistanceToNow } from 'date-fns'

function App() {
  const [notifications, setNotifications] = useState([])
  const [read, setRead] = useState([])
  const [anchorEl, setAnchorEl] = React.useState(null)

  useEffect(() => {
    const stream = new EventSource('http://localhost:3001/stream')

    stream.onmessage = event => {
      setNotifications(current => [JSON.parse(event.data), ...current])
    }
  }, [])

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  }

  const handleSetRead = id => () => {
    setRead(read => [...read, id])
  }

  const renderNotification = notification =>
    <ListItem
      component='div'
      selected={read.some(id => notification.id === id) ? false : notification.unread}
      style={{ minWidth: 300, cursor: 'pointer' }}
      key={notification.date}
      onClick={handleSetRead(notification.id)}>
      <Avatar
        style={{ marginRight: 12 }}
        src={notification.user.image}
        alt={notification.user.name}>
        <Person />
      </Avatar>
      <ListItemText
        primary={notification.user.name}
        secondary={notification.text + ' - ' + formatDistanceToNow(new Date(notification.date), { addSuffix: true })}
      />
    </ListItem>

  const renderNotifications = () =>
    <Popover
      open={!!anchorEl}
      anchorEl={anchorEl}
      onClose={() => setAnchorEl(null)}>
      <List>
        {notifications.map(renderNotification)}
      </List>
    </Popover>

  return (
    <div>
      <Badge
        style={{ margin: 24 }}
        color='secondary'
        badgeContent={notifications.length - read.length}>
        <IconButton disabled={!notifications.length} onClick={handleClick}>
          <Notifications />
        </IconButton>
      </Badge>
      {renderNotifications()}
    </div>
  );
}

export default App;
