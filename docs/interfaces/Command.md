[yor.ts](../README.md) / [Exports](../modules.md) / Command

# Interface: Command

## Implemented by

- [`YorSlashCommand`](../classes/YorSlashCommand.md)

## Table of contents

### Properties

- [autocomplete](Command.md#autocomplete)
- [builder](Command.md#builder)
- [execute](Command.md#execute)

## Properties

### autocomplete

• **autocomplete**: (`context`: [`AutocompleteCommandContext`](../classes/AutocompleteCommandContext.md)) => `void` \| `Promise`\<`void`\>

#### Type declaration

▸ (`context`): `void` \| `Promise`\<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`AutocompleteCommandContext`](../classes/AutocompleteCommandContext.md) |

##### Returns

`void` \| `Promise`\<`void`\>

#### Defined in

[src/interfaces/Command.ts:9](https://github.com/OreOreki/yor.ts/blob/f601845/src/interfaces/Command.ts#L9)

___

### builder

• **builder**: `SlashCommandBuilder`

#### Defined in

[src/interfaces/Command.ts:7](https://github.com/OreOreki/yor.ts/blob/f601845/src/interfaces/Command.ts#L7)

___

### execute

• **execute**: (`context`: [`CommandContext`](../classes/CommandContext.md)) => `void` \| `Promise`\<`void`\>

#### Type declaration

▸ (`context`): `void` \| `Promise`\<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`CommandContext`](../classes/CommandContext.md) |

##### Returns

`void` \| `Promise`\<`void`\>

#### Defined in

[src/interfaces/Command.ts:8](https://github.com/OreOreki/yor.ts/blob/f601845/src/interfaces/Command.ts#L8)