/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
import {
  APIApplicationCommandInteractionDataOption,
  APIApplicationCommandInteractionDataSubcommandGroupOption,
  APIApplicationCommandInteractionDataSubcommandOption,
  APIAttachment,
  APIChannel,
  APIChatInputApplicationCommandInteraction,
  APIInteractionGuildMember,
  APIMessage,
  APIModalInteractionResponseCallbackData,
  ApplicationCommandOptionType,
  MessageFlags,
  RESTPostAPIWebhookWithTokenJSONBody,
} from '@discordjs/core/http-only';
import { RawFile } from '@discordjs/rest';

import { Channel } from '../Channel';
import { Member } from '../Member';
import { Role } from '../Role';
import { User } from '../User';
import { YorClientAPI } from '../YorClientAPI';
import { YorClientError } from '../YorClientError';

import { BaseContext } from './BaseContext';

export class CommandContext extends BaseContext {
  public readonly raw: APIChatInputApplicationCommandInteraction;
  public readonly token: string;
  public readonly id: string;
  public channel: Channel;
  public user: User | undefined;
  public member: Member | undefined;

  public subcommandGroup?: APIApplicationCommandInteractionDataSubcommandGroupOption;
  public subcommand?: APIApplicationCommandInteractionDataSubcommandOption;

  public deferred = false;
  public replied = false;

  private API: YorClientAPI;

  /**
   * Constructs a new instance of the APIApplicationCommandInteractionData class.
   *
   * @param {YorClientAPI} API - The API used to initialize the instance.
   * @param {APIChatInputApplicationCommandInteraction} data - The data used to initialize the instance.
   */
  constructor(
    API: YorClientAPI,
    data: APIChatInputApplicationCommandInteraction,
  ) {
    super();
    this.API = API;

    this.raw = data;
    this.token = this.raw.token;
    this.id = this.raw.id;
    this.channel = new Channel(API.channels, this.raw.channel);
    this.user = this.raw.user ? new User(API.users, this.raw.user) : undefined;
    this.member =
      this.raw.member && this.raw.guild_id
        ? new Member(API, this.raw.guild_id, this.raw.member)
        : undefined;

    this.subcommandGroup = this.raw.data.options?.find(
      (option) => option.type === ApplicationCommandOptionType.SubcommandGroup,
    ) as APIApplicationCommandInteractionDataSubcommandGroupOption;
    this.subcommand = this.raw.data.options?.find(
      (option) => option.type === ApplicationCommandOptionType.Subcommand,
    ) as APIApplicationCommandInteractionDataSubcommandOption;
  }

  /**
   * Defers the execution of the function.
   *
   * @param {boolean} ephemeral - Whether the message is ephemeral or not.
   * @return {Promise<void>} A promise that resolves when the deferral is complete.
   */
  public async defer(ephemeral = false): Promise<void> {
    if (this.deferred || this.replied) {
      throw new YorClientError(
        'Cannot defer message already replied or deferred!',
      );
    }

    await this.API.interactions.defer(this.id, this.token, {
      flags: ephemeral ? MessageFlags.Ephemeral : undefined,
    });
    this.deferred = true;
  }

  /**
   * Replies to an interaction.
   *
   * @param {Omit<RESTPostAPIWebhookWithTokenJSONBody, "username" | "avatar_url"> & { flags?: MessageFlags | undefined; } & { files: RawFile[] }} data - The data for creating the reply.
   * @return {Promise<void>} A promise that resolves when the reply is sent.
   */
  public async reply(
    data: Omit<
      RESTPostAPIWebhookWithTokenJSONBody,
      'username' | 'avatar_url'
    > & { flags?: MessageFlags | undefined } & { files: RawFile[] },
  ): Promise<void> {
    if (this.deferred || this.replied) {
      throw new YorClientError(
        'Cannot reply to message already replied or deferred!',
      );
    }

    await this.API.interactions.reply(this.id, this.token, data);
    this.replied = true;
  }

  /**
   * Edits a reply.
   *
   * @param {Omit<RESTPostAPIWebhookWithTokenJSONBody, "username" | "avatar_url"> & { flags?: MessageFlags | undefined; } & { files: RawFile[] }} data - The data for editing the reply.
   * @return {Promise<APIMessage>} A promise that resolves when the reply is edited.
   */
  public async editReply(
    data: Omit<
      RESTPostAPIWebhookWithTokenJSONBody,
      'username' | 'avatar_url'
    > & { flags?: MessageFlags | undefined } & { files: RawFile[] },
  ): Promise<APIMessage> {
    if (!this.deferred || !this.replied) {
      throw new YorClientError(
        'Cannot edit reply to message not replied or deferred!',
      );
    }

    return this.API.interactions.editReply(this.id, this.token, data);
  }

  /**
   * Deletes a reply.
   *
   * @return {Promise<void>} A promise that resolves when the reply is deleted.
   */
  public async deleteReply(): Promise<void> {
    await this.API.interactions.deleteReply(this.id, this.token);
  }

  /**
   * Fetches the reply asynchronously.
   *
   * @return {Promise<APIMessage>} A promise that resolves when the original reply is fetched.
   */
  public async fetchReply(): Promise<APIMessage> {
    return this.API.interactions.getOriginalReply(this.id, this.token);
  }

  /**
   * Reply to a modal.
   *
   * @param {APIModalInteractionResponseCallbackData} data - The data for creating the modal.
   * @return {Promise<void>} A promise that resolves when the modal is created.
   */
  public async replyModal(
    data: APIModalInteractionResponseCallbackData,
  ): Promise<void> {
    if (this.deferred || this.replied) {
      throw new YorClientError(
        'Cannot show modal to message already replied or deferred!',
      );
    }

    await this.API.interactions.createModal(this.id, this.token, data);
  }

  /**
   * Calls the followUp method of the API class with the provided data.
   *
   * @param {Omit<RESTPostAPIWebhookWithTokenJSONBody, "username" | "avatar_url"> & { flags?: MessageFlags | undefined; } & { files: RawFile[] }} data - The data to be passed to the followUp method.
   * @return {Promise<APIMessage>} A promise that resolves to an APIMessage object.
   */
  public async followUp(
    data: Omit<
      RESTPostAPIWebhookWithTokenJSONBody,
      'username' | 'avatar_url'
    > & { flags?: MessageFlags | undefined } & { files: RawFile[] },
  ): Promise<APIMessage> {
    return this.API.interactions.followUp(this.id, this.token, data);
  }

  /**
   * Checks if the instance is in a guild.
   *
   * @return {boolean} Returns true if the instance is in a guild, otherwise false.
   */
  public inGuild(): boolean {
    return Boolean(this.raw.guild_id);
  }

  /**
   * Retrieves a string option from the command's options.
   *
   * @param {string} name - The name of the option to retrieve.
   * @param {0 | 1 | 2} index - (Optional) The index of the option to retrieve. Defaults to 0.
   * @param {boolean} required - (Optional) Specifies if the option is required. Defaults to false.
   * @return {string | null} - The value of the option, or null if the option is not found and not required.
   */
  public getStringOption<T extends boolean>(
    name: string,
    index: 0 | 1 | 2 = 0,
    required?: T,
  ): T extends true ? string : string | null {
    const options = this.raw.data.options;
    if (!options) {
      throw new YorClientError('This command has no options.');
    }

    let option: APIApplicationCommandInteractionDataOption | undefined;

    switch (index) {
      case 0:
        option = options.find((option) => option.name === name);
        break;

      case 1:
        option = this.subcommand?.options?.find(
          (option) => option.name === name,
        );
        break;

      case 2:
        option = this.subcommandGroup?.options.find(
          (o) => o.options?.find((option) => option.name === name),
        );
        break;

      default:
        break;
    }

    if (!option) {
      if (required) {
        throw new YorClientError(`Option ${name} is required.`);
      }

      return null as T extends true ? string : string | null;
    }

    if (option.type !== ApplicationCommandOptionType.String) {
      throw new YorClientError(`Option ${name} is not of type string.`);
    }

    return option.value as T extends true ? string : string | null;
  }

  /**
   * Retrieves a number option from the command's options.
   *
   * @param {string} name - The name of the option to retrieve.
   * @param {0 | 1 | 2} index - (Optional) The index of the option to retrieve. Defaults to 0.
   * @param {boolean} required - (Optional) Specifies if the option is required. Defaults to false.
   * @return {number | null} - The value of the option, or null if the option is not found and not required.
   */
  public getNumberOption<T extends boolean>(
    name: string,
    index: 0 | 1 | 2 = 0,
    required?: T,
  ): T extends true ? number : number | null {
    const options = this.raw.data.options;
    if (!options) {
      throw new YorClientError('This command has no options.');
    }

    let option: APIApplicationCommandInteractionDataOption | undefined;

    switch (index) {
      case 0:
        option = options.find((o) => o.name === name);
        break;

      case 1:
        option = this.subcommand?.options?.find((o) => o.name === name);
        break;

      case 2:
        option = this.subcommandGroup?.options.find(
          (o) => o.options?.find((o) => o.name === name),
        );
        break;

      default:
        break;
    }

    if (!option) {
      if (required) {
        throw new YorClientError(`Option ${name} is required.`);
      }

      return null as T extends true ? number : number | null;
    }

    if (option.type !== ApplicationCommandOptionType.Number) {
      throw new YorClientError(`Option ${name} is not of type number.`);
    }

    return option.value as T extends true ? number : number | null;
  }

  /**
   * Retrieves an integer option from the API.
   *
   * @param {string} name - The name of the option.
   * @param {0 | 1 | 2} index - The index of the option.
   * @param {boolean} required - Whether the option is required or not.
   * @return {number | null} - The value of the option.
   */
  public getIntegerOption<T extends boolean>(
    name: string,
    index: 0 | 1 | 2 = 0,
    required?: T,
  ): T extends true ? number : number | null {
    const options = this.raw.data.options;
    if (!options) {
      throw new YorClientError('This command has no options.');
    }

    let option: APIApplicationCommandInteractionDataOption | undefined;

    switch (index) {
      case 0:
        option = options.find((o) => o.name === name);
        break;

      case 1:
        option = this.subcommand?.options?.find((o) => o.name === name);
        break;

      case 2:
        option = this.subcommandGroup?.options.find(
          (o) => o.options?.find((o) => o.name === name),
        );
        break;

      default:
        break;
    }

    if (!option) {
      if (required) {
        throw new YorClientError(`Option ${name} is required.`);
      }

      return null as T extends true ? number : number | null;
    }

    if (option.type !== ApplicationCommandOptionType.Integer) {
      throw new YorClientError(`Option ${name} is not of type integer.`);
    }

    return option.value as T extends true ? number : number | null;
  }

  /**
   * Retrieves a boolean option from the command's options.
   *
   * @param {string} name - The name of the option to retrieve.
   * @param {0 | 1 | 2} index - (Optional) The index of the option to retrieve. Defaults to 0.
   * @param {boolean} required - (Optional) Specifies if the option is required. Defaults to false.
   * @return {boolean | null} - The value of the option, or null if the option is not found and not required.
   */
  public getBooleanOption<T extends boolean>(
    name: string,
    index: 0 | 1 | 2 = 0,
    required?: T,
  ): T extends true ? boolean : boolean | null {
    const options = this.raw.data.options;
    if (!options) {
      throw new YorClientError('This command has no options.');
    }

    let option: APIApplicationCommandInteractionDataOption | undefined;

    switch (index) {
      case 0:
        option = options.find((o) => o.name === name);
        break;

      case 1:
        option = this.subcommand?.options?.find((o) => o.name === name);
        break;

      case 2:
        option = this.subcommandGroup?.options.find(
          (o) => o.options?.find((o) => o.name === name),
        );
        break;

      default:
        break;
    }

    if (!option) {
      if (required) {
        throw new YorClientError(`Option ${name} is required.`);
      }

      return null as T extends true ? boolean : boolean | null;
    }

    if (option.type !== ApplicationCommandOptionType.Boolean) {
      throw new YorClientError(`Option ${name} is not of type boolean.`);
    }

    return option.value as T extends true ? boolean : boolean | null;
  }

  /**
   * Retrieves a user option from the command's options.
   *
   * @param {string} name - The name of the option to retrieve.
   * @param {0 | 1 | 2} index - (Optional) The index of the option to retrieve. Defaults to 0.
   * @param {boolean} required - (Optional) Specifies if the option is required. Defaults to false.
   * @return {User | null} - The value of the option, or null if the option is not found and not required.
   */
  public getUserOption<T extends boolean>(
    name: string,
    index: 0 | 1 | 2 = 0,
    required?: T,
  ): T extends true ? User : User | null {
    const options = this.raw.data.options;
    if (!options) {
      throw new YorClientError('This command has no options.');
    }

    let option: APIApplicationCommandInteractionDataOption | undefined;

    switch (index) {
      case 0:
        option = options.find((o) => o.name === name);
        break;

      case 1:
        option = this.subcommand?.options?.find((o) => o.name === name);
        break;

      case 2:
        option = this.subcommandGroup?.options.find(
          (o) => o.options?.find((o) => o.name === name),
        );
        break;

      default:
        break;
    }

    if (!option) {
      if (required) {
        throw new YorClientError(`Option ${name} is required.`);
      }

      return null as T extends true ? User : User | null;
    }

    // @ts-expect-error - value property does not exist according to typescript
    const resolved = this.raw.data.resolved?.users?.[option.value as string];

    if (option.type !== ApplicationCommandOptionType.User) {
      throw new YorClientError(`Option ${name} is not of type user.`);
    }

    if (!resolved) {
      throw new YorClientError(`Option ${name} is required.`);
    }

    return new User(this.API.users, resolved) as T extends true
      ? User
      : User | null;
  }

  /**
   * Retrieves a role option from the command's options.
   *
   * @param {string} name - The name of the option to retrieve.
   * @param {0 | 1 | 2} index - (Optional) The index of the option to retrieve. Defaults to 0.
   * @param {boolean} required - (Optional) Specifies if the option is required. Defaults to false.
   * @return {Role | null} - The value of the option, or null if the option is not found and not required.
   */
  public getRoleOption<T extends boolean>(
    name: string,
    index: 0 | 1 | 2 = 0,
    required?: T,
  ): T extends true ? Role : Role | null {
    const options = this.raw.data.options;
    if (!options) {
      throw new YorClientError('This command has no options.');
    }

    let option: APIApplicationCommandInteractionDataOption | undefined;

    switch (index) {
      case 0:
        option = options.find((o) => o.name === name);
        break;

      case 1:
        option = this.subcommand?.options?.find((o) => o.name === name);
        break;

      case 2:
        option = this.subcommandGroup?.options.find(
          (o) => o.options?.find((o) => o.name === name),
        );
        break;

      default:
        break;
    }

    if (!option) {
      if (required) {
        throw new YorClientError(`Option ${name} is required.`);
      }

      return null as T extends true ? Role : Role | null;
    }

    // @ts-expect-error - value property does not exist according to typescript
    const resolved = this.raw.data.resolved?.roles?.[option.value as string];

    if (option.type !== ApplicationCommandOptionType.Role) {
      throw new YorClientError(`Option ${name} is not of type role.`);
    }

    if (!resolved) {
      throw new YorClientError(`Option ${name} is not resolved.`);
    }

    return new Role(this.API.guilds, resolved) as T extends true
      ? Role
      : Role | null;
  }

  /**
   * Retrieves a channel option from the command's options.
   *
   * @param {string} name - The name of the option to retrieve.
   * @param {0 | 1 | 2} index - (Optional) The index of the option to retrieve. Defaults to 0.
   * @param {boolean} required - (Optional) Specifies if the option is required. Defaults to false.
   * @return {Channel | null} - The value of the option, or null if the option is not found and not required.
   */
  public getChannelOption<T extends boolean>(
    name: string,
    index: 0 | 1 | 2 = 0,
    required?: T,
  ): T extends true ? Channel : Channel | null {
    const options = this.raw.data.options;
    if (!options) {
      throw new YorClientError('This command has no options.');
    }

    let option: APIApplicationCommandInteractionDataOption | undefined;

    switch (index) {
      case 0:
        option = options.find((o) => o.name === name);
        break;

      case 1:
        option = this.subcommand?.options?.find((o) => o.name === name);
        break;

      case 2:
        option = this.subcommandGroup?.options.find(
          (o) => o.options?.find((o) => o.name === name),
        );
        break;

      default:
        break;
    }

    if (!option) {
      if (required) {
        throw new YorClientError(`Option ${name} is required.`);
      }

      return null as T extends true ? Channel : Channel | null;
    }

    // @ts-expect-error - value property does not exist according to typescript
    const resolved = this.raw.data.resolved?.channels?.[option.value as string];

    if (option.type !== ApplicationCommandOptionType.Channel) {
      throw new YorClientError(`Option ${name} is not of type channel.`);
    }

    if (!resolved) {
      throw new YorClientError(`Option ${name} is not resolved.`);
    }

    return new Channel(
      this.API.channels,
      resolved as APIChannel,
    ) as T extends true ? Channel : Channel | null;
  }

  /**
   * Retrieves a user option from the command's options.
   *
   * @param {string} name - The name of the option to retrieve.
   * @param {0 | 1 | 2} index - (Optional) The index of the option to retrieve. Defaults to 0.
   * @param {boolean} required - (Optional) Specifies if the option is required. Defaults to false.
   * @return {User | null} - The value of the option, or null if the option is not found and not required.
   */
  public getMemberOption<T extends boolean>(
    name: string,
    index: 0 | 1 | 2 = 0,
    required?: T,
  ): T extends true ? Member : Member | null {
    const options = this.raw.data.options;
    if (!options) {
      throw new YorClientError('This command has no options.');
    }

    let option: APIApplicationCommandInteractionDataOption | undefined;

    switch (index) {
      case 0:
        option = options.find((o) => o.name === name);
        break;

      case 1:
        option = this.subcommand?.options?.find((o) => o.name === name);
        break;

      case 2:
        option = this.subcommandGroup?.options.find(
          (o) => o.options?.find((o) => o.name === name),
        );
        break;

      default:
        break;
    }

    if (!option) {
      if (required) {
        throw new YorClientError(`Option ${name} is required.`);
      }

      return null as T extends true ? Member : Member | null;
    }

    // @ts-expect-error - value property does not exist according to typescript
    const resolved = this.raw.data.resolved?.members?.[option.value as string];

    if (option.type !== ApplicationCommandOptionType.User) {
      throw new YorClientError(`Option ${name} is not of type user.`);
    }

    if (!resolved) {
      throw new YorClientError(`Option ${name} is not resolved.`);
    }

    return new Member(
      this.API,
      this.raw.guild_id as string,
      resolved as APIInteractionGuildMember,
    ) as T extends true ? Member : Member | null;
  }

  /**
   * Retrieves the value of the attachment option from the interaction data.
   *
   * @param {string} name - The name of the attachment option.
   * @param {0 | 1 | 2} index - The index of the attachment option.
   * @param {boolean} required - Whether the attachment option is required.
   * @returns {Attachment | null} The value of the attachment option, or null if it doesn't exist.
   * @throws {YorClientError} If the attachment option is required but doesn't exist.
   */
  public getAttachmentOption<T extends boolean>(
    name: string,
    index: 0 | 1 | 2 = 0,
    required?: T,
  ): T extends true ? APIAttachment : APIAttachment | null {
    const options = this.raw.data.options;
    if (!options) {
      throw new YorClientError('This command has no options.');
    }

    let option: APIApplicationCommandInteractionDataOption | undefined;

    switch (index) {
      case 0:
        option = options.find((o) => o.name === name);
        break;

      case 1:
        option = this.subcommand?.options?.find((o) => o.name === name);
        break;

      case 2:
        option = this.subcommandGroup?.options.find(
          (o) => o.options?.find((o) => o.name === name),
        );
        break;

      default:
        break;
    }

    if (!option) {
      if (required) {
        throw new YorClientError(`Option ${name} is required.`);
      }

      return null as T extends true ? APIAttachment : APIAttachment | null;
    }

    const resolved =
      // @ts-expect-error - value property does not exist according to typescript
      this.raw.data.resolved?.attachments?.[option.value as string];

    if (option.type !== ApplicationCommandOptionType.Attachment) {
      throw new YorClientError(`Option ${name} is not of type attachment.`);
    }

    if (!resolved) {
      throw new YorClientError(`Option ${name} is not resolved.`);
    }

    return resolved as T extends true ? APIAttachment : APIAttachment | null;
  }
}
