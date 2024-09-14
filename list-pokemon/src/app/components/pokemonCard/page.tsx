import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { Box } from "@mui/system";

export default function PokemonCard({ name, image, power, types }) {
  const pokemonNameURL = `/${name}`;

  const checkTypes = () => {
    if (types[1]) {
      return types[0].type.name + " | " + types[1].type.name;
    }
    return types[0].type.name;
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 180 }} image={image} title={name} />
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {checkTypes()}
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Power Level: {power}
        </Typography>
      </CardContent>
      <CardActions className="flex items-center justify-center">
        <Button size="small" className="rounded-xl shadow-md text-center ">
          <Link
            href={{
              pathname: `${pokemonNameURL}`,
              query: { name: name },
            }}
            font-style="bold"
          >
            stats
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
}
