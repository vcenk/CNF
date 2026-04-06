import { ProductDraft } from "@/domain/cnf";

export interface ProductDraftRepository {
  save(draft: ProductDraft): Promise<ProductDraft>;
  getById(id: string): Promise<ProductDraft | null>;
}

export class InMemoryProductDraftRepository implements ProductDraftRepository {
  private drafts = new Map<string, ProductDraft>();

  async save(draft: ProductDraft): Promise<ProductDraft> {
    this.drafts.set(draft.id, draft);
    return draft;
  }

  async getById(id: string): Promise<ProductDraft | null> {
    return this.drafts.get(id) ?? null;
  }
}

