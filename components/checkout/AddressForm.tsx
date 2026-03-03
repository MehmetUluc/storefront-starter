interface AddressFormProps {
  prefix: string
}

export function AddressForm({ prefix }: AddressFormProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label htmlFor={`${prefix}_first_name`} className="block text-sm font-medium mb-1">First Name</label>
        <input
          id={`${prefix}_first_name`}
          name={`${prefix}_first_name`}
          type="text"
          required
          className="w-full px-4 py-2 border border-[var(--color-border)] rounded-[var(--radius)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        />
      </div>
      <div>
        <label htmlFor={`${prefix}_last_name`} className="block text-sm font-medium mb-1">Last Name</label>
        <input
          id={`${prefix}_last_name`}
          name={`${prefix}_last_name`}
          type="text"
          required
          className="w-full px-4 py-2 border border-[var(--color-border)] rounded-[var(--radius)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={`${prefix}_address`} className="block text-sm font-medium mb-1">Address</label>
        <input
          id={`${prefix}_address`}
          name={`${prefix}_address`}
          type="text"
          required
          className="w-full px-4 py-2 border border-[var(--color-border)] rounded-[var(--radius)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        />
      </div>
      <div>
        <label htmlFor={`${prefix}_city`} className="block text-sm font-medium mb-1">City</label>
        <input
          id={`${prefix}_city`}
          name={`${prefix}_city`}
          type="text"
          required
          className="w-full px-4 py-2 border border-[var(--color-border)] rounded-[var(--radius)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        />
      </div>
      <div>
        <label htmlFor={`${prefix}_state`} className="block text-sm font-medium mb-1">State</label>
        <input
          id={`${prefix}_state`}
          name={`${prefix}_state`}
          type="text"
          required
          className="w-full px-4 py-2 border border-[var(--color-border)] rounded-[var(--radius)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        />
      </div>
      <div>
        <label htmlFor={`${prefix}_postal`} className="block text-sm font-medium mb-1">Postal Code</label>
        <input
          id={`${prefix}_postal`}
          name={`${prefix}_postal`}
          type="text"
          required
          className="w-full px-4 py-2 border border-[var(--color-border)] rounded-[var(--radius)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        />
      </div>
      <div>
        <label htmlFor={`${prefix}_country`} className="block text-sm font-medium mb-1">Country</label>
        <input
          id={`${prefix}_country`}
          name={`${prefix}_country`}
          type="text"
          required
          className="w-full px-4 py-2 border border-[var(--color-border)] rounded-[var(--radius)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        />
      </div>
    </div>
  )
}
