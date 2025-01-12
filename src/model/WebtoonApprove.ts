export interface ApprovalPayload {
  webtoonIds: number[];
  approval: 'APPROVAL' | 'APPROVAL_DENIED';
  reason:
    | 'COPYRIGHT'
    | 'VIOLATION'
    | 'INAPPROPRIATE'
    | 'DISCRIMINATION'
    | 'PERSONAL'
    | 'PROFANITY';
  detailReason: string;
}
