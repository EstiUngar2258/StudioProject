import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { SvgIcon, Chip, Stack } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
// ServiceCard.jsx
import { useNavigate } from "react-router-dom";

const parseDescription = (desc) => {
  // אם יש "כולל", פצל
  const includeIdx = desc.indexOf("includes") !== -1 ? desc.indexOf("includes") : -1;
  if (includeIdx === -1) return { main: desc, list: [] };
  const main = desc.slice(0, includeIdx).trim();
  // קח את מה שאחרי "כולל"
  const after = desc.slice(includeIdx + "includes:".length).trim();
  // פצל לפי +
  const list = after.split("+").map(s => s.trim()).filter(Boolean);
  return { main, list };
};

const ServiceCard = ({ service, onSelect }) => {
     const navigate = useNavigate();
  const { main, list } = parseDescription(service.description || "");

  return (
    <Card
      sx={{
        minWidth: 260,
        maxWidth: 340,
        margin: "1rem auto",
        borderRadius: 5,
        boxShadow: "0 2px 12px 0 #23234a55",
        background: "linear-gradient(135deg, #23234a 0%, #181828 100%)",
        color: "#fff",
        border: "2px solid #43cea2",
        transition: "transform 0.2s",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
        position: "relative"
      }}
    >
      {/* פס צבעוני עליון */}
      <Box sx={{
        height: 7,
        width: "100%",
        background: "linear-gradient(90deg, #43cea2 0%, #185a9d 100%)"
      }} />
      <CardContent sx={{ pb: 1.5, flex: 1, display: "flex", flexDirection: "column" }}>
        <Box display="flex" alignItems="center" mb={2}>
          <SvgIcon sx={{ fontSize: 40, color: "#43cea2", mr: 1 }}>
            {/* אייקון דוגמה */}
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
          </SvgIcon>
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: 900,
              fontFamily: "'Heebo', 'Rubik', Arial, sans-serif",
              color: "#43cea2",
              letterSpacing: "2px",
              textShadow: "0 2px 24px #23234a, 0 1px 1px #43cea2",
              flex: 1,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
          >
            {service.serviceName}
          </Typography>
        </Box>
        <Divider sx={{ bgcolor: "#43cea2", mb: 2, opacity: 0.4 }} />
        <Typography
          variant="body1"
          sx={{
            color: "#fff",
            mb: list.length ? 0.5 : 1,
            fontFamily: "'Heebo', 'Rubik', Arial, sans-serif",
            fontWeight: 300,
            fontSize: "1.07rem",
            letterSpacing: "0.5px",
            textShadow: "0 1px 8px #23234a",
            opacity: 0.92,
            minHeight: 88, // 4 שורות (בהנחה שגובה שורה רגיל ~22px)
            flex: 1,
            display: "-webkit-box",
            WebkitLineClamp: 4, // תמיד 4 שורות
            WebkitBoxOrient: "vertical",
            overflow: "hidden"
          }}
        >
          {main}
          {list.length > 0 && (
            <span style={{ display: "block", color: "#43cea2", fontWeight: 500, marginTop: 4 }}>includes:</span>
          )}
        </Typography>
        {list.length > 0 && (
          <ul style={{
            color: "#43cea2",
            fontFamily: "'Heebo', 'Rubik', Arial, sans-serif",
            fontWeight: 400,
            fontSize: "1.01rem",
            margin: "0 0 8px 0",
            paddingRight: 22,
            listStyle: "disc inside"
          }}>
            {list.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        )}
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1, mt: "auto" }}>
          {service.duration && (
            <Chip
              icon={<AccessTimeIcon sx={{ color: "#43cea2" }} />}
              label={`משך: ${service.duration} שעות`}
              sx={{
                background: "rgba(67,206,162,0.13)",
                color: "#43cea2",
                fontWeight: 600,
                fontFamily: "'Heebo', 'Rubik', Arial, sans-serif",
                fontSize: "0.97rem",
                letterSpacing: "0.5px",
                borderRadius: 2,
                px: 1.2
              }}
              size="small"
            />
          )}
          {service.price && (
            <Chip
              label={`מחיר: ${service.price} ₪`}
              sx={{
                background: "rgba(67,206,162,0.13)",
                color: "#fff",
                fontWeight: 600,
                fontFamily: "'Heebo', 'Rubik', Arial, sans-serif",
                fontSize: "0.97rem",
                letterSpacing: "0.5px",
                borderRadius: 2,
                px: 1.2
              }}
              size="small"
            />
          )}
        </Stack>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0, mt: "auto" }}>
        <Button
          fullWidth
          size="large"
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          sx={{
            background: "linear-gradient(90deg, #43cea2 0%, #185a9d 100%)",
            color: "#fff",
            borderRadius: 8,
            fontWeight: 900,
            letterSpacing: 1.5,
            fontFamily: "'Heebo', 'Rubik', Arial, sans-serif",
            boxShadow: "none",
            py: 1.2,
            fontSize: "1.13rem",
            textShadow: "0 1px 8px #23234a"
          }}
          onClick={() => onSelect && onSelect(service) && navigate('\CreateAppointmentForm.jsx', { state: { service } })}
        >
          הוספת תור
        </Button>
      </CardActions>
    </Card>
  );
};

export default ServiceCard;