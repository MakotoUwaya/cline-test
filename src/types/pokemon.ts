interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface Pokemon {
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  types: PokemonType[];
  abilities: PokemonAbility[];
}
