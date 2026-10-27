import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Todo({ todo, onCheck, onDelete, onUpdate }) {
  return (
    <>
      <Card className="todoCard" sx={{ minWidth: 275, backgroundColor: "#283593", marginTop: "12px" }}>
        <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
          <Grid container spacing={1} style={{ color: "white" }}>
            <Grid size={{ xs: 6, md: 4 }} style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>

              <IconButton
                size="small"
                color="secondary"
                style={{ color: "red", backgroundColor: "white", border: "solid red 2px" }}
                aria-label="delete"
                className='iconButton'
                onClick={() => onDelete(todo)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>

              <IconButton
                onClick={() => onUpdate(todo)}
                size="small"
                color="secondary"
                style={{ color: "#1799c8", backgroundColor: "white", border: "solid #1799c8 2px" }}
                aria-label="edit"
                className='iconButton'
              >
                <EditIcon fontSize="small" />
              </IconButton>

              <IconButton
                size="small"
                color="secondary"
                style={{
                  color: todo.iscomplited ? "white" : "#8bc34a",
                  backgroundColor: todo.iscomplited ? "#8bc34a" : "white",
                  border: "solid #8bc34a 2px"
                }}
                aria-label="complete"
                className='iconButton'
                onClick={() => onCheck(todo.id)}
              >
                <CheckIcon fontSize="small" />
              </IconButton>

            </Grid>
            <Grid size={{ xs: 6, md: 8 }}>
              <Typography
                variant="h6"
                align="center"
                sx={{ textDecoration: todo.iscomplited ? "line-through" : "none" }}
              >
                {todo.Task_Title}
              </Typography>
              <Typography variant="body2" align="center">
                {todo.details}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}