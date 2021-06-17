import React from "react";

import "./style.css";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: "232px",
  },
  media: {
    height: 140,
  },
  produtoInfo: {
    marginTop: "11px",
  },
  produtoEstoque: {
    marginRight: "64px",
  },
});

function ProdutoCard() {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="http://placehold.it/240x230"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Nome do Produto
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
          <div className={classes.produtoInfo}>
            <span className={classes.produtoEstoque}>3 unidades</span>
            <span> R$ 99.99</span>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProdutoCard;
