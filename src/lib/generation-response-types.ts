import { RunActionsResponse } from "../generated/api/resources/actions/types/RunActionsResponse.js"
import type { CreateGenerationsResponse as GeneratedCreate } from "../generated/api/resources/generations/types/CreateGenerationsResponse.js"

export type GenerationQuote = Extract<GeneratedCreate, { type: "generation_quote" }>
export type GenerationCreateResult = GeneratedCreate
/** Keep the published ordinary-run response and its namespace source-compatible. */
export type CreateGenerationsResponse = Exclude<GeneratedCreate, GenerationQuote>
export namespace CreateGenerationsResponse {
  export const Type = RunActionsResponse.Type
  export type Type = RunActionsResponse.Type
  export type Model = RunActionsResponse.Model
  export type Technique = RunActionsResponse.Technique
  export type Action = RunActionsResponse.Action
  export namespace Action {
    export const ActionId = RunActionsResponse.Action.ActionId
    export type ActionId = RunActionsResponse.Action.ActionId
  }
  export type Warnings = RunActionsResponse.Warnings
  export namespace Warnings {
    export type Item = RunActionsResponse.Warnings.Item
  }
}
export { CreateGenerationsResponse as StartGenerationRunsResponse }
