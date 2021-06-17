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
    height: 240,
  },
  produtoInfo: {
    marginTop: "11px",
  },
  produtoEstoque: {
    marginRight: "64px",
  },
});

function ProdutoCard({ nome, estoque, categoria, preco, descricao, imagem }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={imagem}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {nome}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {descricao}
          </Typography>
          <div className={classes.produtoInfo}>
            <span className={classes.produtoEstoque}>{estoque} unidades</span>
            <span> R$ {preco}</span>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProdutoCard;
