[yor.ts](../README.md) / [Exports](../modules.md) / CommandContext

# Class: CommandContext

## Hierarchy

- `BaseContext`

  ↳ **`CommandContext`**

## Table of contents

### Constructors

- [constructor](CommandContext.md#constructor)

### Properties

- [API](CommandContext.md#api)
- [channel](CommandContext.md#channel)
- [deferred](CommandContext.md#deferred)
- [id](CommandContext.md#id)
- [raw](CommandContext.md#raw)
- [replied](CommandContext.md#replied)
- [subcommand](CommandContext.md#subcommand)
- [subcommandGroup](CommandContext.md#subcommandgroup)
- [token](CommandContext.md#token)

### Methods

- [decorate](CommandContext.md#decorate)
- [defer](CommandContext.md#defer)
- [deleteReply](CommandContext.md#deletereply)
- [editReply](CommandContext.md#editreply)
- [fetchReply](CommandContext.md#fetchreply)
- [followUp](CommandContext.md#followup)
- [getBooleanOption](CommandContext.md#getbooleanoption)
- [getChannelOption](CommandContext.md#getchanneloption)
- [getIntegerOption](CommandContext.md#getintegeroption)
- [getMemberOption](CommandContext.md#getmemberoption)
- [getNumberOption](CommandContext.md#getnumberoption)
- [getRoleOption](CommandContext.md#getroleoption)
- [getStringOption](CommandContext.md#getstringoption)
- [getUserOption](CommandContext.md#getuseroption)
- [inGuild](CommandContext.md#inguild)
- [reply](CommandContext.md#reply)
- [replyModal](CommandContext.md#replymodal)

## Constructors

### constructor

• **new CommandContext**(`API`, `data`): [`CommandContext`](CommandContext.md)

Constructs a new instance of the APIApplicationCommandInteractionData class.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `API` | `API` | The API used to initialize the instance. |
| `data` | `APIChatInputApplicationCommandInteraction` | The data used to initialize the instance. |

#### Returns

[`CommandContext`](CommandContext.md)

#### Overrides

BaseContext.constructor

#### Defined in

[src/structures/Contexts/CommandContext.ts:42](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Contexts/CommandContext.ts#L42)

## Properties

### API

• `Private` **API**: `InteractionsAPI`

#### Defined in

[src/structures/Contexts/CommandContext.ts:34](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Contexts/CommandContext.ts#L34)

___

### channel

• **channel**: [`Channel`](Channel.md)

#### Defined in

[src/structures/Contexts/CommandContext.ts:26](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Contexts/CommandContext.ts#L26)

___

### deferred

• **deferred**: `boolean` = `false`

#### Defined in

[src/structures/Contexts/CommandContext.ts:31](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Contexts/CommandContext.ts#L31)

___

### id

• **id**: `string`

#### Defined in

[src/structures/Contexts/CommandContext.ts:25](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Contexts/CommandContext.ts#L25)

___

### raw

• `Readonly` **raw**: `APIChatInputApplicationCommandInteraction`

#### Defined in

[src/structures/Contexts/CommandContext.ts:23](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Contexts/CommandContext.ts#L23)

___

### replied

• **replied**: `boolean` = `false`

#### Defined in

[src/structures/Contexts/CommandContext.ts:32](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Contexts/CommandContext.ts#L32)

___

### subcommand

• `Optional` **subcommand**: `APIApplicationCommandInteractionDataSubcommandOption`

#### Defined in

[src/structures/Contexts/CommandContext.ts:29](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Contexts/CommandContext.ts#L29)

___

### subcommandGroup

• `Optional` **subcommandGroup**: `APIApplicationCommandInteractionDataSubcommandGroupOption`

#### Defined in

[src/structures/Contexts/CommandContext.ts:28](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Contexts/CommandContext.ts#L28)

___

### token

• **token**: `string`

#### Defined in

[src/structures/Contexts/CommandContext.ts:24](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Contexts/CommandContext.ts#L24)

## Methods

### decorate

▸ **decorate**(`name`, `data`): `unknown`

Decorates the object with a new property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the property. |
| `data` | `unknown` | The data to assign to the property. |

#### Returns

`unknown`

The decorated object.

#### Inherited from

BaseContext.decorate

#### Defined in

[src/structures/Contexts/BaseContext.ts:9](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Contexts/BaseContext.ts#L9)

___

### defer

▸ **defer**(`ephemeral?`): `Promise`\<`void`\>

Defers the execution of the function.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `ephemeral` | `boolean` | `false` | Whether the message is ephemeral or not. |

#### Returns

`Promise`\<`void`\>

A promise that resolves when the deferral is complete.

#### Defined in

[src/structures/Contexts/CommandContext.ts:65](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Contexts/CommandContext.ts#L65)

___

### deleteReply

▸ **deleteReply**(): `Promise`\<`void`\>

Deletes a reply.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the reply is deleted.

#### Defined in

[src/structures/Contexts/CommandContext.ts:120](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Contexts/CommandContext.ts#L120)

___

### editReply

▸ **editReply**(`data`): `Promise`\<`APIMessage`\>

Edits a reply.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Omit`\<`RESTPostAPIWebhookWithTokenJSONBody`, ``"username"`` \| ``"avatar_url"``\> & \{ `flags?`: `MessageFlags`  } & \{ `files?`: `RawFile`[]  } | The data for editing the reply. |

#### Returns

`Promise`\<`APIMessage`\>

A promise that resolves when the reply is edited.

#### Defined in

[src/structures/Contexts/CommandContext.ts:103](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Contexts/CommandContext.ts#L103)

___

### fetchReply

▸ **fetchReply**(): `Promise`\<`APIMessage`\>

Fetches the reply asynchronously.

#### Returns

`Promise`\<`APIMessage`\>

A promise that resolves when the original reply is fetched.

#### Defined in

[src/structures/Contexts/CommandContext.ts:129](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Contexts/CommandContext.ts#L129)

___

### followUp

▸ **followUp**(`data`): `Promise`\<`APIMessage`\>

Calls the followUp method of the API class with the provided data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Omit`\<`RESTPostAPIWebhookWithTokenJSONBody`, ``"username"`` \| ``"avatar_url"``\> & \{ `flags?`: `MessageFlags`  } & \{ `files?`: `RawFile`[]  } | The data to be passed to the followUp method. |

#### Returns

`Promise`\<`APIMessage`\>

A promise that resolves to an APIMessage object.

#### Defined in

[src/structures/Contexts/CommandContext.ts:157](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Contexts/CommandContext.ts#L157)

___

### getBooleanOption

▸ **getBooleanOption**\<`T`\>(`name`, `index?`, `required?`): `T` extends ``true`` ? ``null`` \| `boolean` : `boolean`

Retrieves a boolean option from the command's options.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `boolean` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `undefined` | The name of the option to retrieve. |
| `index` | ``0`` \| ``2`` \| ``1`` | `0` | (Optional) The index of the option to retrieve. Defaults to 0. |
| `required?` | `T` | `undefined` | (Optional) Specifies if the option is required. Defaults to false. |

#### Returns

`T` extends ``true`` ? ``null`` \| `boolean` : `boolean`

- The value of the option, or null if the option is not found and not required.

#### Defined in

[src/structures/Contexts/CommandContext.ts:344](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Contexts/CommandContext.ts#L344)

___

### getChannelOption

▸ **getChannelOption**\<`T`\>(`name`, `index?`, `required?`): `T` extends ``true`` ? `APIInteractionDataResolvedChannel` : ``null`` \| `APIInteractionDataResolvedChannel`

Retrieves a channel option from the command's options.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `boolean` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `undefined` | The name of the option to retrieve. |
| `index` | ``0`` \| ``2`` \| ``1`` | `0` | (Optional) The index of the option to retrieve. Defaults to 0. |
| `required?` | `T` | `undefined` | (Optional) Specifies if the option is required. Defaults to false. |

#### Returns

`T` extends ``true`` ? `APIInteractionDataResolvedChannel` : ``null`` \| `APIInteractionDataResolvedChannel`

- The value of the option, or null if the option is not found and not required.

#### Defined in

[src/structures/Contexts/CommandContext.ts:512](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Contexts/CommandContext.ts#L512)

___

### getIntegerOption

▸ **getIntegerOption**\<`T`\>(`name`, `index?`, `required?`): `T` extends ``true`` ? ``null`` \| `number` : `number`

Retrieves an integer option from the API.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `boolean` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `undefined` | The name of the option. |
| `index` | ``0`` \| ``2`` \| ``1`` | `0` | The index of the option. |
| `required?` | `T` | `undefined` | Whether the option is required or not. |

#### Returns

`T` extends ``true`` ? ``null`` \| `number` : `number`

- The value of the option.

#### Defined in

[src/structures/Contexts/CommandContext.ts:290](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Contexts/CommandContext.ts#L290)

___

### getMemberOption

▸ **getMemberOption**\<`T`\>(`name`, `index?`, `required?`): `T` extends ``true`` ? `APIInteractionDataResolvedGuildMember` : ``null`` \| `APIInteractionDataResolvedGuildMember`

Retrieves a user option from the command's options.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `boolean` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `undefined` | The name of the option to retrieve. |
| `index` | ``0`` \| ``2`` \| ``1`` | `0` | (Optional) The index of the option to retrieve. Defaults to 0. |
| `required?` | `T` | `undefined` | (Optional) Specifies if the option is required. Defaults to false. |

#### Returns

`T` extends ``true`` ? `APIInteractionDataResolvedGuildMember` : ``null`` \| `APIInteractionDataResolvedGuildMember`

- The value of the option, or null if the option is not found and not required.

#### Defined in

[src/structures/Contexts/CommandContext.ts:575](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Contexts/CommandContext.ts#L575)

___

### getNumberOption

▸ **getNumberOption**\<`T`\>(`name`, `index?`, `required?`): `T` extends ``true`` ? ``null`` \| `number` : `number`

Retrieves a number option from the command's options.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `boolean` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `undefined` | The name of the option to retrieve. |
| `index` | ``0`` \| ``2`` \| ``1`` | `0` | (Optional) The index of the option to retrieve. Defaults to 0. |
| `required?` | `T` | `undefined` | (Optional) Specifies if the option is required. Defaults to false. |

#### Returns

`T` extends ``true`` ? ``null`` \| `number` : `number`

- The value of the option, or null if the option is not found and not required.

#### Defined in

[src/structures/Contexts/CommandContext.ts:236](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Contexts/CommandContext.ts#L236)

___

### getRoleOption

▸ **getRoleOption**\<`T`\>(`name`, `index?`, `required?`): `T` extends ``true`` ? ``null`` \| `APIRole` : `APIRole`

Retrieves a role option from the command's options.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `boolean` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `undefined` | The name of the option to retrieve. |
| `index` | ``0`` \| ``2`` \| ``1`` | `0` | (Optional) The index of the option to retrieve. Defaults to 0. |
| `required?` | `T` | `undefined` | (Optional) Specifies if the option is required. Defaults to false. |

#### Returns

`T` extends ``true`` ? ``null`` \| `APIRole` : `APIRole`

- The value of the option, or null if the option is not found and not required.

#### Defined in

[src/structures/Contexts/CommandContext.ts:455](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Contexts/CommandContext.ts#L455)

___

### getStringOption

▸ **getStringOption**\<`T`\>(`name`, `index?`, `required?`): `T` extends ``true`` ? ``null`` \| `string` : `string`

Retrieves a string option from the command's options.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `boolean` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `undefined` | The name of the option to retrieve. |
| `index` | ``0`` \| ``2`` \| ``1`` | `0` | (Optional) The index of the option to retrieve. Defaults to 0. |
| `required?` | `T` | `undefined` | (Optional) Specifies if the option is required. Defaults to false. |

#### Returns

`T` extends ``true`` ? ``null`` \| `string` : `string`

- The value of the option, or null if the option is not found and not required.

#### Defined in

[src/structures/Contexts/CommandContext.ts:180](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Contexts/CommandContext.ts#L180)

___

### getUserOption

▸ **getUserOption**\<`T`\>(`name`, `index?`, `required?`): `T` extends ``true`` ? ``null`` \| `APIUser` : `APIUser`

Retrieves a user option from the command's options.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `boolean` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `undefined` | The name of the option to retrieve. |
| `index` | ``0`` \| ``2`` \| ``1`` | `0` | (Optional) The index of the option to retrieve. Defaults to 0. |
| `required?` | `T` | `undefined` | (Optional) Specifies if the option is required. Defaults to false. |

#### Returns

`T` extends ``true`` ? ``null`` \| `APIUser` : `APIUser`

- The value of the option, or null if the option is not found and not required.

#### Defined in

[src/structures/Contexts/CommandContext.ts:398](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Contexts/CommandContext.ts#L398)

___

### inGuild

▸ **inGuild**(): `boolean`

Checks if the instance is in a guild.

#### Returns

`boolean`

Returns true if the instance is in a guild, otherwise false.

#### Defined in

[src/structures/Contexts/CommandContext.ts:168](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Contexts/CommandContext.ts#L168)

___

### reply

▸ **reply**(`data`): `Promise`\<`void`\>

A description of the entire function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Omit`\<`RESTPostAPIWebhookWithTokenJSONBody`, ``"username"`` \| ``"avatar_url"``\> & \{ `flags?`: `MessageFlags`  } & \{ `files?`: `RawFile`[]  } | description of the data parameter |

#### Returns

`Promise`\<`void`\>

description of the return value

#### Defined in

[src/structures/Contexts/CommandContext.ts:84](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Contexts/CommandContext.ts#L84)

___

### replyModal

▸ **replyModal**(`data`): `Promise`\<`void`\>

Reply to a modal.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `APIModalInteractionResponseCallbackData` | The data for creating the modal. |

#### Returns

`Promise`\<`void`\>

A promise that resolves when the modal is created.

#### Defined in

[src/structures/Contexts/CommandContext.ts:139](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Contexts/CommandContext.ts#L139)