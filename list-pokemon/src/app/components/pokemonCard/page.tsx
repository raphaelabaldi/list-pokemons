import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";

export default function PokemonCard({ details }) {
  const { name, abilities, sprites, stats, types } = details;
  const pokemonNameURL = `/${name}`;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {name} is a pokemon type
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <Link href={pokemonNameURL} font-style="bold">
            Details
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
}
