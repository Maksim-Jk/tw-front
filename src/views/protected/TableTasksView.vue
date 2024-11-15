<template>
  <div class="card">
    <div class="flex justify-between mb-3">
      <div class="flex gap-2">
        <SelectButton
          v-model="selectedTab"
          :options="tabsOptions"
          optionLabel="name"
          class="p-button-secondary"
        />
      </div>
      <div class="flex gap-4">
        <Button
          label="Отменить выбор"
          @click="clearSelection"
          :disabled="selectedTasks.length === 0"
          outlined
        />
        <Button
          icon="pi pi-trash"
          severity="danger"
          @click="deleteSelected"
          :disabled="selectedTasks.length === 0"
          outlined
        />
        <Button label="Добавить вопрос" severity="primary" @click="addQuestion" />
      </div>
    </div>

    <DataTable
      v-model:selection="selectedTasks"
      :value="tasks"
      :paginator="true"
      :rowsPerPageOptions="[10, 20, 50]"
      v-model:rows="rows"
      v-model:first="first"
      :totalRecords="totalRecords"
      :loading="loading"
      dataKey="id"
      :globalFilterFields="['title', 'date', 'status']"
      paginatorTemplate="CurrentPageReport PrevPageLink NextPageLink RowsPerPageDropdown"
      :currentPageReportTemplate="
        t('table.pageReport', { first: '{first}', last: '{last}', totalRecords: '{totalRecords}' })
      "
      :lazy="true"
      responsiveLayout="scroll"
      @rowClick="showTaskPreview"
      rowHover
      :rowClass="(data) => ({ 'preview-selected': selectedTaskForPreview?.id === data.id })"
    >
      <template #header>
        <div class="flex gap-2">
          <div class="search-container w-full relative">
            <i class="pi pi-search search-icon" />
            <InputText
              v-model="filters['global'].value"
              placeholder="Поиск..."
              class="w-full pl-5"
            />
          </div>
          <Button
            icon="pi pi-filter"
            outlined
            @click="toggle"
            :class="{ 'p-button-info': isFilterActive }"
            aria-haspopup="true"
            aria-controls="filter-popup"
          />
          <Popover
            ref="op"
            position="left"
            :mouseTrack="false"
            :mouseTrackTop="0"
            class="popover-filter"
          >
            <div class="p-4 w-[640px]">
              <div class="flex flex-col gap-4">
                <div
                  class="grid grid-cols-12 gap-4"
                  :class="selectedTab.id === 1 ? 'grid-rows-2' : ''"
                >
                  <div :class="selectedTab.id === 1 ? 'col-span-12' : 'col-span-6'">
                    <label class="block mb-2">Период</label>
                    <DatePicker
                      v-model="filters.date.value"
                      selectionMode="range"
                      dateFormat="dd.mm.yy"
                      :modelValue="filters.date.value"
                      class="w-full"
                      showIcon
                      fluid
                      iconDisplay="input"
                      :placeholder="'Выберите период'"
                    />
                  </div>
                  <div :class="selectedTab.id === 1 ? 'col-span-12' : 'col-span-6'">
                    <div
                      class="grid gap-4"
                      :class="selectedTab.id === 1 ? 'grid-cols-2' : 'grid-cols-1'"
                    >
                      <div>
                        <label class="block mb-2">Приоритет</label>
                        <Dropdown
                          v-model="filters.priority.value"
                          :options="priorityOptions"
                          :optionLabel="(option) => t(`task.priorities.${option.id}`)"
                          placeholder="Выберите приоритет"
                          class="w-full"
                        />
                      </div>
                      <div v-if="selectedTab.id === 1">
                        <label class="block mb-2">Статус</label>
                        <Dropdown
                          v-model="filters.status.value"
                          :options="statusOptions"
                          :optionLabel="(option) => t(`task.statuses.${option.id}`)"
                          placeholder="Выберите статус"
                          class="w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex gap-2 justify-end">
                  <Button label="Сбросить" outlined @click="resetFilters" />
                  <Button label="Применить" @click="applyFilters" />
                </div>
              </div>
            </div>
          </Popover>
        </div>
      </template>

      <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>

      <Column field="title" header="Задача">
        <template #body="{ data }">
          {{ data.title }}
        </template>
      </Column>

      <Column field="status" header="Статус" v-if="selectedTab.id === 1">
        <template #body="{ data }">
          <Tag
            :value="t(`task.statuses.${data.status_id}`)"
            :severity="getStatusSeverity(data.status_id)"
          />
        </template>
      </Column>

      <Column field="date" header="Запрошен">
        <template #body="{ data }">
          {{ formatTaskDate(data.created_at) }}
        </template>
      </Column>

      <Column :exportable="false">
        <template #body="{ data }">
          <Button
            icon="pi pi-ellipsis-v"
            rounded
            text
            @click="(event) => taskMenu.toggle(event)"
            aria-haspopup="true"
            aria-controls="popup_menu"
          />
          <Popover
            class="popover-menu"
            ref="taskMenu"
            position="center"
            :mouseTrack="false"
            :mouseTrackTop="0"
          >
            <div class="flex flex-col max-w-[160px]">
              <Button
                label="Редактировать"
                class="justify-end"
                icon="pi pi-pencil"
                text
                @click="
                  () => {
                    editTask(data);
                    taskMenu.hide();
                  }
                "
              />
              <Button
                label="Удалить"
                icon="pi pi-trash"
                class="justify-end"
                text
                severity="danger"
                @click="
                  () => {
                    deleteTask(data);
                    taskMenu.hide();
                  }
                "
              />
            </div>
          </Popover>
        </template>
      </Column>

      <template #empty>
        <div class="flex flex-col items-center justify-center py-12">
          <div class="mb-6">
            <i class="pi pi-file-excel text-7xl text-gray-300"></i>
          </div>
          <p class="text-xl text-gray-500 mb-2">{{ t('table.noData') }}</p>
          <p class="text-sm text-gray-400">{{ t('table.noDataDescription') }}</p>
        </div>
      </template>
    </DataTable>

    <Popover
      ref="taskPreviewPopover"
      :mouseTrack="false"
      class="task-preview-popover"
      position="right"
    >
      <div class="p-4 w-[600px]">
        <div v-if="selectedTaskForPreview" class="flex flex-col gap-3">
          <div class="flex items-center gap-2">
            <Tag
              :value="t(`task.priorities.${selectedTaskForPreview.priority_id}`)"
              severity="warning"
            />
          </div>
          <h3 class="text-base font-medium">{{ selectedTaskForPreview.title }}</h3>
          <p class="text-[15px] text-[--p-surface-400] line-clamp-2">
            {{ selectedTaskForPreview.description }}
          </p>
        </div>
      </div>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSettingsStore } from '@/stores/settings';
import { TasksService } from '@/api/tasks/tasks.service';
import { PROTECTED_ROUTES } from '@/router/routes';
import type { Task } from '@/api/tasks/task.types';
import { getStatusSeverity, formatTaskDate } from '@/helpers/task.helper';
import { useRouter } from 'vue-router';

defineExpose({
  getStatusSeverity,
  formatTaskDate,
});

interface TableFilters {
  global: {
    value: any;
    matchMode: string;
  };
  date: {
    value: [Date | null, Date | null] | null;
    matchMode: string;
  };
  priority: {
    value: any;
    matchMode: string;
  };
  status: {
    value: any;
    matchMode: string;
  };
}

const DEFAULT_ROWS = 10;
const { t } = useI18n();
const settingsStore = useSettingsStore();
const router = useRouter();

const tasks = ref<Task[]>([]);
const loading = ref(false);
const filters = ref<TableFilters>({
  global: { value: null, matchMode: 'contains' },
  date: { value: null, matchMode: 'equals' },
  priority: { value: null, matchMode: 'equals' },
  status: { value: null, matchMode: 'equals' },
});
const selectedTasks = ref<Task[]>([]);
const selectedTab = ref({ id: 1, name: t('common.1') });
const rows = ref(DEFAULT_ROWS);
const first = ref(0);
const totalRecords = ref(0);
const isFilterActive = ref(false);

const tabsOptions = computed(() =>
  (settingsStore.getSettingsByKey('types') as Array<{ id: number }>)?.map((type) => ({
    ...type,
    name: t(`common.${type.id}`),
  }))
);

const priorityOptions = computed(
  () => settingsStore.getSettingsByKey('priorities') as Array<{ id: number; name: string }>
);

const statusOptions = computed(
  () => settingsStore.getSettingsByKey('statuses') as Array<{ id: number; name: string }>
);

watch(
  [first, rows],
  () => {
    first.value = 0;
    loadTasks();
  },
  { deep: true }
);

watch(selectedTab, () => {
  rows.value = DEFAULT_ROWS;
  first.value = 0;
  filters.value = {
    global: { value: null, matchMode: 'contains' },
    date: { value: null, matchMode: 'equals' },
    priority: { value: null, matchMode: 'equals' },
    status: { value: null, matchMode: 'equals' },
  };
  loadTasks();
});

watch(
  () => filters.value.global.value,
  (newValue) => {
    first.value = 0;
    if (newValue !== null) {
      loadTasks();
    }
  }
);

const loadTasks = async () => {
  try {
    loading.value = true;
    const page = Math.floor(first.value / rows.value) + 1;
    const searchValue = filters.value.global.value;

    let formattedStartDate = null;
    let formattedEndDate = null;

    if (filters.value.date.value && filters.value.date.value[0]) {
      formattedStartDate =
        new Date(
          filters.value.date.value[0].getTime() -
            filters.value.date.value[0].getTimezoneOffset() * 60000
        )
          .toISOString()
          .slice(0, 19)
          .replace('T', ' ') + '.00000';

      if (filters.value.date.value[1]) {
        formattedEndDate =
          new Date(
            filters.value.date.value[1].getTime() -
              filters.value.date.value[1].getTimezoneOffset() * 60000
          )
            .toISOString()
            .slice(0, 19)
            .replace('T', ' ') + '.00000';
      }
    }

    const response = await TasksService.getTasks(selectedTab.value.id, {
      page,
      limit: rows.value,
      search: searchValue || '',
      date_from: formattedStartDate,
      date_to: formattedEndDate,
      priority_id: filters.value.priority.value?.id,
      status_id: filters.value.status.value?.id,
    });

    tasks.value = response.items;
    totalRecords.value = Number(response.total);

    if (response.items.length === 0 && page > 1) {
      first.value = Math.max(0, first.value - rows.value);
      await loadTasks();
    }
  } catch (error) {
    console.error('Ошибка при загрузке задач:', error);
  } finally {
    loading.value = false;
  }
};

const editTask = (task: Task): void => {
  router.push({ name: PROTECTED_ROUTES.EDIT_TASK, params: { id: task.id } });
};

const deleteTask = async (task: Task): Promise<void> => {
  try {
    await TasksService.deleteTask(task.id.toString());
    tasks.value = tasks.value.filter((t) => t.id !== task.id);
  } catch (error) {
    console.error('Ошибка при удалении задачи:', error);
  }
};

const deleteSelected = async (): Promise<void> => {
  try {
    const taskIds = selectedTasks.value.map((task) => task.id.toString());
    await TasksService.deleteManyTasks(taskIds);
    tasks.value = tasks.value.filter((task) => !taskIds.includes(task.id.toString()));
    selectedTasks.value = [];
  } catch (error) {
    console.error('Ошибка при удалении выбранных задач:', error);
  }
};

const clearSelection = (): void => {
  selectedTasks.value = [];
};

const addQuestion = (): void => {
  router.push({ name: PROTECTED_ROUTES.CREATE_TASK });
};

const op = ref();

const toggle = (event: Event) => {
  op.value.toggle(event);
};

const resetFilters = () => {
  filters.value.date.value = null;
  filters.value.priority.value = null;
  filters.value.status.value = null;
  isFilterActive.value = false;
  loadTasks();
};

const applyFilters = () => {
  op.value.hide();
  isFilterActive.value =
    !!filters.value.date.value || !!filters.value.priority.value || !!filters.value.status.value;
  loadTasks();
};

const taskMenu = ref();
const taskPreviewPopover = ref();
const selectedTaskForPreview = ref<Task | null>(null);

const showTaskPreview = async (event: { data: Task; originalEvent: MouseEvent }) => {
  if (selectedTaskForPreview.value?.id === event.data.id) {
    return;
  }

  if (taskPreviewPopover.value.visible) {
    taskPreviewPopover.value.hide();
    await nextTick();
  }

  selectedTaskForPreview.value = event.data;
  await nextTick();

  try {
    if (event.originalEvent && !taskPreviewPopover.value.visible) {
      taskPreviewPopover.value.show(event.originalEvent);
    }
  } catch (error) {
    console.error('Error showing popover:', error);
  }
};

onMounted(() => {
  loadTasks();
});
</script>

<style scoped>
.search-container {
  position: relative;
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  color: var(--text-color-secondary);
}

:deep(.p-inputtext) {
  padding-left: 2.5rem;
}

:deep(.p-datepicker .p-inputtext) {
  padding-left: 0.75rem;
}

:deep(.p-datatable-tbody > tr > td) {
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
}

:deep(.p-datatable-column-title) {
  font-weight: 500;
  font-size: 15px;
  line-height: var(--line-height-lg);
  color: var(--p-surface-400);
  text-transform: uppercase;
}

:deep(.p-paginator-content) {
  margin-left: auto;
}

:deep(.p-datatable-tbody > tr) {
  cursor: pointer;
}

:deep(.task-preview-popover.p-popover) {
  max-width: 400px;
  z-index: 1000;
}

:deep(.p-datatable-tbody > tr.preview-selected) {
  background-color: var(--p-surface-100) !important;
}

:deep(.p-datatable-tbody > tr) {
  cursor: pointer;
}

:deep(.popover-menu.p-popover .p-popover-content) {
  min-width: 160px;
}
</style>
