import React from "react";

import "./style.css";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  media: {
    height: 240,
  },
  produtoInfo: {
    marginTop: "11px",
  },
  produtoEstoque: {
    marginRight: "64px",
    color: "rgba(101, 101, 101, 0.87)",
  },
});

function ProdutoCard({
  nome,
  estoque,
  categoria,
  preco,
  descricao,
  imagem,
  id,
}) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={`${imagem}`}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {nome}
          </Typography>
          <Typography
            variant="body2"
            color="rgba(34, 34, 34, 0.87)"
            component="p"
          >
            {descricao}
          </Typography>
          <div className={classes.produtoInfo}>
            <span className={classes.produtoEstoque}>{estoque} unidades</span>
            <span style={{ fontWeight: 700 }}>
              {" "}
              R$ {(preco / 100).toFixed(2)}
            </span>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProdutoCard;
